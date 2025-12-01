const express = require('express');
const Joi = require('joi');
const { getDatabase } = require('../database/init');
const { logger } = require('../utils/logger');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Get all skills with filtering and pagination
router.get('/', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const {
      page = 1,
      limit = 10,
      category,
      difficulty,
      search,
      sort = 'popularity'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = '';
    let params = [];

    // Build WHERE clause
    const conditions = [];
    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }
    if (difficulty && difficulty !== 'all') {
      conditions.push('difficulty = ?');
      params.push(difficulty);
    }
    if (search) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    // Build ORDER BY clause
    let orderClause = 'ORDER BY ';
    switch (sort) {
      case 'title':
        orderClause += 'title ASC';
        break;
      case 'difficulty':
        orderClause += 'difficulty ASC';
        break;
      case 'newest':
        orderClause += 'created_at DESC';
        break;
      default:
        orderClause += 'popularity DESC';
    }

    // Get total count
    db.get(
      `SELECT COUNT(*) as total FROM skills ${whereClause}`,
      params,
      (err, countResult) => {
        if (err) {
          logger.error('Error counting skills:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        const total = countResult.total;

        // Get skills with pagination
        db.all(
          `SELECT 
            s.*,
            COALESCE(us.progress, 0) as user_progress,
            CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END as is_enrolled
          FROM skills s
          LEFT JOIN user_skills us ON s.id = us.skill_id AND us.user_id = ?
          ${whereClause}
          ${orderClause}
          LIMIT ? OFFSET ?`,
          [req.user.userId, ...params, parseInt(limit), offset],
          (err, skills) => {
            if (err) {
              logger.error('Error fetching skills:', err);
              return res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }

            // Parse JSON fields
            const processedSkills = skills.map(skill => ({
              ...skill,
              topics: skill.topics ? JSON.parse(skill.topics) : []
            }));

            res.json({
              success: true,
              data: {
                skills: processedSkills,
                pagination: {
                  page: parseInt(page),
                  limit: parseInt(limit),
                  total,
                  pages: Math.ceil(total / limit)
                }
              }
            });
          }
        );
      }
    );
  } catch (error) {
    logger.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get skill by ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const skillId = req.params.id;

    db.get(
      `SELECT 
        s.*,
        COALESCE(us.progress, 0) as user_progress,
        us.mastery_level,
        us.enrolled_at,
        us.completed_at,
        CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END as is_enrolled
      FROM skills s
      LEFT JOIN user_skills us ON s.id = us.skill_id AND us.user_id = ?
      WHERE s.id = ?`,
      [req.user.userId, skillId],
      (err, skill) => {
        if (err) {
          logger.error('Error fetching skill:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!skill) {
          return res.status(404).json({
            success: false,
            message: 'Skill not found'
          });
        }

        // Parse JSON fields
        skill.topics = skill.topics ? JSON.parse(skill.topics) : [];

        res.json({
          success: true,
          data: { skill }
        });
      }
    );
  } catch (error) {
    logger.error('Get skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Enroll in a skill
router.post('/:id/enroll', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const skillId = req.params.id;
    const userId = req.user.userId;

    // Check if skill exists
    db.get('SELECT id FROM skills WHERE id = ?', [skillId], (err, skill) => {
      if (err) {
        logger.error('Error checking skill:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }

      if (!skill) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found'
        });
      }

      // Check if already enrolled
      db.get(
        'SELECT id FROM user_skills WHERE user_id = ? AND skill_id = ?',
        [userId, skillId],
        (err, enrollment) => {
          if (err) {
            logger.error('Error checking enrollment:', err);
            return res.status(500).json({
              success: false,
              message: 'Internal server error'
            });
          }

          if (enrollment) {
            return res.status(409).json({
              success: false,
              message: 'Already enrolled in this skill'
            });
          }

          // Enroll user
          db.run(
            'INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)',
            [userId, skillId],
            function(err) {
              if (err) {
                logger.error('Error enrolling in skill:', err);
                return res.status(500).json({
                  success: false,
                  message: 'Failed to enroll in skill'
                });
              }

              logger.info(`User ${userId} enrolled in skill ${skillId}`);

              res.status(201).json({
                success: true,
                message: 'Successfully enrolled in skill'
              });
            }
          );
        }
      );
    });
  } catch (error) {
    logger.error('Skill enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update skill progress
router.patch('/:id/progress', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const skillId = req.params.id;
    const userId = req.user.userId;
    const { progress, masteryLevel } = req.body;

    // Validate input
    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: 'Progress must be between 0 and 100'
      });
    }

    const validMasteryLevels = ['Novice', 'Intermediate', 'Expert', 'Master'];
    if (masteryLevel && !validMasteryLevels.includes(masteryLevel)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mastery level'
      });
    }

    // Update progress
    db.run(
      `UPDATE user_skills 
       SET progress = ?, mastery_level = COALESCE(?, mastery_level),
           completed_at = CASE WHEN ? = 100 THEN CURRENT_TIMESTAMP ELSE completed_at END
       WHERE user_id = ? AND skill_id = ?`,
      [progress, masteryLevel, progress, userId, skillId],
      function(err) {
        if (err) {
          logger.error('Error updating skill progress:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to update progress'
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({
            success: false,
            message: 'Skill enrollment not found'
          });
        }

        res.json({
          success: true,
          message: 'Progress updated successfully'
        });
      }
    );
  } catch (error) {
    logger.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's enrolled skills
router.get('/user/enrolled', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;

    db.all(
      `SELECT 
        s.*,
        us.progress,
        us.mastery_level,
        us.enrolled_at,
        us.completed_at
      FROM user_skills us
      JOIN skills s ON us.skill_id = s.id
      WHERE us.user_id = ?
      ORDER BY us.enrolled_at DESC`,
      [userId],
      (err, skills) => {
        if (err) {
          logger.error('Error fetching enrolled skills:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        // Parse JSON fields
        const processedSkills = skills.map(skill => ({
          ...skill,
          topics: skill.topics ? JSON.parse(skill.topics) : []
        }));

        res.json({
          success: true,
          data: { skills: processedSkills }
        });
      }
    );
  } catch (error) {
    logger.error('Get enrolled skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;