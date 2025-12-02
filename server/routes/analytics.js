const express = require('express');
const { getDatabase } = require('../database/init');
const { logger } = require('../utils/logger');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;

    const analytics = {};
    let completedQueries = 0;
    const totalQueries = 6;

    // User performance over time
    db.all(
      `SELECT 
        DATE(completed_at) as date,
        AVG(score) as avg_score,
        COUNT(*) as exam_count
      FROM exams 
      WHERE user_id = ? AND status = 'completed' AND completed_at >= date('now', '-30 days')
      GROUP BY DATE(completed_at)
      ORDER BY date`,
      [userId],
      (err, performanceData) => {
        if (err) {
          logger.error('Error fetching performance data:', err);
          analytics.performance = [];
        } else {
          analytics.performance = performanceData;
        }
        
        completedQueries++;
        if (completedQueries === totalQueries) sendResponse();
      }
    );

    // Skill progress breakdown
    db.all(
      `SELECT 
        s.title,
        s.category,
        us.progress,
        us.mastery_level,
        COUNT(e.id) as exam_count,
        AVG(e.score) as avg_score
      FROM user_skills us
      JOIN skills s ON us.skill_id = s.id
      LEFT JOIN exams e ON s.id = e.skill_id AND e.user_id = us.user_id AND e.status = 'completed'
      WHERE us.user_id = ?
      GROUP BY s.id
      ORDER BY us.progress DESC`,
      [userId],
      (err, skillsData) => {
        if (err) {
          logger.error('Error fetching skills data:', err);
          analytics.skills = [];
        } else {
          analytics.skills = skillsData;
        }
        
        completedQueries++;
        if (completedQueries === totalQueries) sendResponse();
      }
    );

    // Recent activity
    db.all(
      `SELECT 
        'exam_completed' as type,
        e.title,
        e.score,
        e.completed_at as timestamp,
        s.title as skill_title
      FROM exams e
      JOIN skills s ON e.skill_id = s.id
      WHERE e.user_id = ? AND e.status = 'completed'
      ORDER BY e.completed_at DESC
      LIMIT 10`,
      [userId],
      (err, activityData) => {
        if (err) {
          logger.error('Error fetching activity data:', err);
          analytics.activity = [];
        } else {
          analytics.activity = activityData;
        }
        
        completedQueries++;
        if (completedQueries === totalQueries) sendResponse();
      }
    );

    // Learning streaks
    db.all(
      `SELECT 
        DATE(completed_at) as date,
        COUNT(*) as daily_exams
      FROM exams 
      WHERE user_id = ? AND status = 'completed' AND completed_at >= date('now', '-90 days')
      GROUP BY DATE(completed_at)
      ORDER BY date`,
      [userId],
      (err, streakData) => {
        if (err) {
          logger.error('Error fetching streak data:', err);
          analytics.streaks = [];
        } else {
          analytics.streaks = streakData;
        }
        
        completedQueries++;
        if (completedQueries === totalQueries) sendResponse();
      }
    );

    // Category performance
    db.all(
      `SELECT 
        s.category,
        COUNT(e.id) as exam_count,
        AVG(e.score) as avg_score,
        MAX(e.score) as best_score
      FROM exams e
      JOIN skills s ON e.skill_id = s.id
      WHERE e.user_id = ? AND e.status = 'completed'
      GROUP BY s.category
      ORDER BY avg_score DESC`,
      [userId],
      (err, categoryData) => {
        if (err) {
          logger.error('Error fetching category data:', err);
          analytics.categories = [];
        } else {
          analytics.categories = categoryData;
        }
        
        completedQueries++;
        if (completedQueries === totalQueries) sendResponse();
      }
    );

    // Overall statistics
    db.get(
      `SELECT 
        COUNT(CASE WHEN e.status = 'completed' THEN 1 END) as total_exams,
        AVG(CASE WHEN e.status = 'completed' THEN e.score END) as avg_score,
        MAX(CASE WHEN e.status = 'completed' THEN e.score END) as best_score,
        COUNT(DISTINCT e.skill_id) as skills_attempted,
        SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) as completed_exams
      FROM exams e
      WHERE e.user_id = ?`,
      [userId],
      (err, statsData) => {
        if (err) {
          logger.error('Error fetching stats data:', err);
          analytics.stats = {};
        } else {
          analytics.stats = statsData;
        }
        
        completedQueries++;
        if (completedQueries === totalQueries) sendResponse();
      }
    );

    function sendResponse() {
      res.json({
        success: true,
        data: analytics
      });
    }
  } catch (error) {
    logger.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get performance analytics with filtering
router.get('/performance', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;
    const { timeframe = '30d', skillId, difficulty } = req.query;

    let dateFilter = "date('now', '-30 days')";
    switch (timeframe) {
      case '7d': dateFilter = "date('now', '-7 days')"; break;
      case '90d': dateFilter = "date('now', '-90 days')"; break;
      case '1y': dateFilter = "date('now', '-1 year')"; break;
    }

    let whereClause = `WHERE e.user_id = ? AND e.status = 'completed' AND e.completed_at >= ${dateFilter}`;
    let params = [userId];

    if (skillId) {
      whereClause += ' AND e.skill_id = ?';
      params.push(skillId);
    }

    if (difficulty) {
      whereClause += ' AND e.difficulty = ?';
      params.push(difficulty);
    }

    db.all(
      `SELECT 
        e.id,
        e.title,
        e.score,
        e.difficulty,
        e.completed_at,
        s.title as skill_title,
        s.category
      FROM exams e
      JOIN skills s ON e.skill_id = s.id
      ${whereClause}
      ORDER BY e.completed_at DESC`,
      params,
      (err, performanceData) => {
        if (err) {
          logger.error('Error fetching performance analytics:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        res.json({
          success: true,
          data: {
            performance: performanceData,
            summary: {
              totalExams: performanceData.length,
              averageScore: performanceData.length > 0 
                ? Math.round(performanceData.reduce((sum, exam) => sum + exam.score, 0) / performanceData.length)
                : 0,
              bestScore: performanceData.length > 0 
                ? Math.max(...performanceData.map(exam => exam.score))
                : 0
            }
          }
        });
      }
    );
  } catch (error) {
    logger.error('Get performance analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get skills progress analytics
router.get('/skills', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;

    db.all(
      `SELECT 
        s.id,
        s.title,
        s.category,
        s.difficulty,
        us.progress,
        us.mastery_level,
        us.enrolled_at,
        us.completed_at,
        COUNT(e.id) as exam_count,
        AVG(e.score) as avg_score,
        MAX(e.score) as best_score
      FROM skills s
      LEFT JOIN user_skills us ON s.id = us.skill_id AND us.user_id = ?
      LEFT JOIN exams e ON s.id = e.skill_id AND e.user_id = ? AND e.status = 'completed'
      WHERE us.user_id IS NOT NULL
      GROUP BY s.id
      ORDER BY us.progress DESC, s.title`,
      [userId, userId],
      (err, skillsData) => {
        if (err) {
          logger.error('Error fetching skills analytics:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        res.json({
          success: true,
          data: {
            skills: skillsData,
            summary: {
              totalSkills: skillsData.length,
              completedSkills: skillsData.filter(skill => skill.progress === 100).length,
              averageProgress: skillsData.length > 0
                ? Math.round(skillsData.reduce((sum, skill) => sum + (skill.progress || 0), 0) / skillsData.length)
                : 0
            }
          }
        });
      }
    );
  } catch (error) {
    logger.error('Get skills analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get leaderboard data
router.get('/leaderboard', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const { timeframe = 'all', category = 'overall', limit = 50 } = req.query;

    let dateFilter = '';
    if (timeframe !== 'all') {
      switch (timeframe) {
        case 'week': dateFilter = "AND e.completed_at >= date('now', '-7 days')"; break;
        case 'month': dateFilter = "AND e.completed_at >= date('now', '-30 days')"; break;
        case 'year': dateFilter = "AND e.completed_at >= date('now', '-1 year')"; break;
      }
    }

    let categoryFilter = '';
    if (category !== 'overall') {
      categoryFilter = 'AND s.category = ?';
    }

    const params = category !== 'overall' ? [category, parseInt(limit)] : [parseInt(limit)];

    db.all(
      `SELECT 
        u.id,
        u.name,
        u.email,
        u.points,
        u.streak,
        COUNT(e.id) as exam_count,
        AVG(e.score) as avg_score,
        MAX(e.score) as best_score,
        COUNT(DISTINCT e.skill_id) as skills_count
      FROM users u
      LEFT JOIN exams e ON u.id = e.user_id AND e.status = 'completed' ${dateFilter}
      LEFT JOIN skills s ON e.skill_id = s.id
      WHERE u.is_active = 1 ${categoryFilter}
      GROUP BY u.id
      ORDER BY u.points DESC, avg_score DESC
      LIMIT ?`,
      params,
      (err, leaderboardData) => {
        if (err) {
          logger.error('Error fetching leaderboard:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        // Add rank to each user
        const rankedData = leaderboardData.map((user, index) => ({
          ...user,
          rank: index + 1,
          avg_score: Math.round(user.avg_score || 0)
        }));

        res.json({
          success: true,
          data: {
            leaderboard: rankedData,
            filters: {
              timeframe,
              category,
              total: rankedData.length
            }
          }
        });
      }
    );
  } catch (error) {
    logger.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;