const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { getDatabase } = require('../database/init');
const { logger } = require('../utils/logger');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('student', 'instructor', 'admin').default('student')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Register endpoint
router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const { name, email, password, role = 'student' } = req.body;
    const db = getDatabase();

    // Check if user already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        logger.error('Database error during registration:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      try {
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        db.run(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          [name, email, hashedPassword, role],
          function(err) {
            if (err) {
              logger.error('Error creating user:', err);
              return res.status(500).json({
                success: false,
                message: 'Failed to create user'
              });
            }

            const userId = this.lastID;

            // Generate JWT token
            const token = jwt.sign(
              { userId, email, role },
              process.env.JWT_SECRET || 'your-secret-key',
              { expiresIn: '7d' }
            );

            // Get user data without password
            db.get(
              'SELECT id, name, email, role, points, streak, created_at FROM users WHERE id = ?',
              [userId],
              (err, user) => {
                if (err) {
                  logger.error('Error fetching user data:', err);
                  return res.status(500).json({
                    success: false,
                    message: 'User created but failed to fetch data'
                  });
                }

                logger.info(`New user registered: ${email}`);

                res.status(201).json({
                  success: true,
                  message: 'User registered successfully',
                  data: {
                    user,
                    token
                  }
                });
              }
            );
          }
        );
      } catch (hashError) {
        logger.error('Error hashing password:', hashError);
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login endpoint
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDatabase();

    // Find user by email
    db.get(
      'SELECT id, name, email, password, role, points, streak, is_active FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) {
          logger.error('Database error during login:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
          });
        }

        if (!user.is_active) {
          return res.status(401).json({
            success: false,
            message: 'Account is deactivated'
          });
        }

        try {
          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return res.status(401).json({
              success: false,
              message: 'Invalid email or password'
            });
          }

          // Update last login
          db.run(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
            [user.id]
          );

          // Generate JWT token
          const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
          );

          // Remove password from response
          const { password: _, ...userWithoutPassword } = user;

          logger.info(`User logged in: ${email}`);

          res.json({
            success: true,
            message: 'Login successful',
            data: {
              user: userWithoutPassword,
              token
            }
          });
        } catch (compareError) {
          logger.error('Error comparing password:', compareError);
          res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }
      }
    );
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();

    db.get(
      `SELECT 
        id, name, email, role, avatar, bio, location, phone, website, linkedin, github,
        points, streak, created_at, last_login, email_verified
      FROM users WHERE id = ?`,
      [req.user.userId],
      (err, user) => {
        if (err) {
          logger.error('Error fetching user profile:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        res.json({
          success: true,
          data: { user }
        });
      }
    );
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Refresh token
router.post('/refresh', authenticateToken, (req, res) => {
  try {
    const { userId, email, role } = req.user;

    // Generate new token
    const token = jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: { token }
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Logout (client-side token removal, but we can log the action)
router.post('/logout', authenticateToken, (req, res) => {
  try {
    logger.info(`User logged out: ${req.user.email}`);
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;