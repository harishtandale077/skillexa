const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDatabase } = require('../database/init');
const { logger } = require('../utils/logger');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/avatars');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Validation schemas
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  bio: Joi.string().max(500),
  location: Joi.string().max(100),
  phone: Joi.string().max(20),
  website: Joi.string().uri(),
  linkedin: Joi.string().max(200),
  github: Joi.string().max(200)
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).max(128).required()
});

// Update user profile
router.patch('/profile', authenticateToken, validateRequest(updateProfileSchema), (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;
    const updates = req.body;

    // Build dynamic update query
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(userId);

    db.run(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values,
      function(err) {
        if (err) {
          logger.error('Error updating user profile:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to update profile'
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        logger.info(`User profile updated: ${userId}`);

        res.json({
          success: true,
          message: 'Profile updated successfully'
        });
      }
    );
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Change password
router.patch('/password', authenticateToken, validateRequest(changePasswordSchema), async (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Get current password hash
    db.get('SELECT password FROM users WHERE id = ?', [userId], async (err, user) => {
      if (err) {
        logger.error('Error fetching user for password change:', err);
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

      try {
        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        
        if (!isValidPassword) {
          return res.status(400).json({
            success: false,
            message: 'Current password is incorrect'
          });
        }

        // Hash new password
        const saltRounds = 12;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update password
        db.run(
          'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [hashedNewPassword, userId],
          function(err) {
            if (err) {
              logger.error('Error updating password:', err);
              return res.status(500).json({
                success: false,
                message: 'Failed to update password'
              });
            }

            logger.info(`Password updated for user: ${userId}`);

            res.json({
              success: true,
              message: 'Password updated successfully'
            });
          }
        );
      } catch (hashError) {
        logger.error('Error hashing new password:', hashError);
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    });
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Upload avatar
router.post('/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const db = getDatabase();
    const userId = req.user.userId;
    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    db.run(
      'UPDATE users SET avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [avatarPath, userId],
      function(err) {
        if (err) {
          logger.error('Error updating avatar:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to update avatar'
          });
        }

        logger.info(`Avatar updated for user: ${userId}`);

        res.json({
          success: true,
          message: 'Avatar updated successfully',
          data: {
            avatarUrl: avatarPath
          }
        });
      }
    );
  } catch (error) {
    logger.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;

    // Get comprehensive user statistics
    const queries = {
      examsCompleted: 'SELECT COUNT(*) as count FROM exams WHERE user_id = ? AND status = "completed"',
      averageScore: 'SELECT AVG(score) as avg FROM exams WHERE user_id = ? AND score IS NOT NULL',
      skillsEnrolled: 'SELECT COUNT(*) as count FROM user_skills WHERE user_id = ?',
      certificatesEarned: 'SELECT COUNT(*) as count FROM certificates WHERE user_id = ? AND status = "active"',
      achievementsUnlocked: 'SELECT COUNT(*) as count FROM user_achievements WHERE user_id = ?',
      totalStudyTime: 'SELECT SUM(time_spent) as total FROM user_answers WHERE user_id = ?'
    };

    const stats = {};
    let completedQueries = 0;
    const totalQueries = Object.keys(queries).length;

    Object.entries(queries).forEach(([key, query]) => {
      db.get(query, [userId], (err, result) => {
        if (err) {
          logger.error(`Error fetching ${key}:`, err);
          stats[key] = 0;
        } else {
          stats[key] = result.count || result.avg || result.total || 0;
        }

        completedQueries++;
        if (completedQueries === totalQueries) {
          res.json({
            success: true,
            data: {
              stats: {
                examsCompleted: stats.examsCompleted,
                averageScore: Math.round(stats.averageScore || 0),
                skillsEnrolled: stats.skillsEnrolled,
                certificatesEarned: stats.certificatesEarned,
                achievementsUnlocked: stats.achievementsUnlocked,
                totalStudyTime: Math.round((stats.totalStudyTime || 0) / 60) // Convert to minutes
              }
            }
          });
        }
      });
    });
  } catch (error) {
    logger.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;