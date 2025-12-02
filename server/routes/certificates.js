const express = require('express');
const Joi = require('joi');
const crypto = require('crypto');
const { getDatabase } = require('../database/init');
const { logger } = require('../utils/logger');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user certificates
router.get('/', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;
    const { status, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = 'WHERE c.user_id = ?';
    let params = [userId];

    if (status && status !== 'all') {
      whereClause += ' AND c.status = ?';
      params.push(status);
    }

    db.all(
      `SELECT 
        c.*,
        s.title as skill_title,
        s.category as skill_category,
        e.score as exam_score
      FROM certificates c
      JOIN skills s ON c.skill_id = s.id
      JOIN exams e ON c.exam_id = e.id
      ${whereClause}
      ORDER BY c.issue_date DESC
      LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset],
      (err, certificates) => {
        if (err) {
          logger.error('Error fetching certificates:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        res.json({
          success: true,
          data: { certificates }
        });
      }
    );
  } catch (error) {
    logger.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get certificate by ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const certificateId = req.params.id;
    const userId = req.user.userId;

    db.get(
      `SELECT 
        c.*,
        s.title as skill_title,
        s.category as skill_category,
        s.description as skill_description,
        e.score as exam_score,
        u.name as user_name
      FROM certificates c
      JOIN skills s ON c.skill_id = s.id
      JOIN exams e ON c.exam_id = e.id
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ? AND c.user_id = ?`,
      [certificateId, userId],
      (err, certificate) => {
        if (err) {
          logger.error('Error fetching certificate:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!certificate) {
          return res.status(404).json({
            success: false,
            message: 'Certificate not found'
          });
        }

        res.json({
          success: true,
          data: { certificate }
        });
      }
    );
  } catch (error) {
    logger.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Generate certificate after exam completion
router.post('/generate', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;
    const { examId } = req.body;

    if (!examId) {
      return res.status(400).json({
        success: false,
        message: 'Exam ID is required'
      });
    }

    // Get exam details
    db.get(
      `SELECT 
        e.*,
        s.title as skill_title,
        s.category as skill_category,
        u.name as user_name
      FROM exams e
      JOIN skills s ON e.skill_id = s.id
      JOIN users u ON e.user_id = u.id
      WHERE e.id = ? AND e.user_id = ? AND e.status = 'completed' AND e.score >= 70`,
      [examId, userId],
      (err, exam) => {
        if (err) {
          logger.error('Error fetching exam for certificate:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!exam) {
          return res.status(404).json({
            success: false,
            message: 'Exam not found or score too low for certification (minimum 70%)'
          });
        }

        // Check if certificate already exists
        db.get(
          'SELECT id FROM certificates WHERE exam_id = ? AND user_id = ?',
          [examId, userId],
          (err, existingCert) => {
            if (err) {
              logger.error('Error checking existing certificate:', err);
              return res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }

            if (existingCert) {
              return res.status(409).json({
                success: false,
                message: 'Certificate already exists for this exam'
              });
            }

            // Generate unique credential ID
            const credentialId = `SF-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
            
            // Calculate expiry date (2 years from issue)
            const expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 2);

            // Create certificate
            db.run(
              `INSERT INTO certificates 
               (user_id, skill_id, exam_id, title, description, score, credential_id, expiry_date)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                userId,
                exam.skill_id,
                examId,
                `${exam.skill_title} Certification`,
                `Certification in ${exam.skill_title} - ${exam.skill_category}`,
                exam.score,
                credentialId,
                expiryDate.toISOString()
              ],
              function(err) {
                if (err) {
                  logger.error('Error creating certificate:', err);
                  return res.status(500).json({
                    success: false,
                    message: 'Failed to generate certificate'
                  });
                }

                const certificateId = this.lastID;

                logger.info(`Certificate generated: ${certificateId} for user ${userId}`);

                res.status(201).json({
                  success: true,
                  message: 'Certificate generated successfully',
                  data: {
                    certificateId,
                    credentialId,
                    title: `${exam.skill_title} Certification`,
                    score: exam.score
                  }
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    logger.error('Generate certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify certificate by credential ID
router.get('/verify/:credentialId', (req, res) => {
  try {
    const db = getDatabase();
    const credentialId = req.params.credentialId;

    db.get(
      `SELECT 
        c.*,
        s.title as skill_title,
        s.category as skill_category,
        u.name as user_name,
        e.score as exam_score
      FROM certificates c
      JOIN skills s ON c.skill_id = s.id
      JOIN users u ON c.user_id = u.id
      JOIN exams e ON c.exam_id = e.id
      WHERE c.credential_id = ?`,
      [credentialId],
      (err, certificate) => {
        if (err) {
          logger.error('Error verifying certificate:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!certificate) {
          return res.status(404).json({
            success: false,
            message: 'Certificate not found',
            valid: false
          });
        }

        // Check if certificate is still valid
        const now = new Date();
        const expiryDate = new Date(certificate.expiry_date);
        const isValid = certificate.status === 'active' && now < expiryDate;

        res.json({
          success: true,
          valid: isValid,
          data: {
            certificate: {
              id: certificate.id,
              title: certificate.title,
              user_name: certificate.user_name,
              skill_title: certificate.skill_title,
              skill_category: certificate.skill_category,
              score: certificate.exam_score,
              issue_date: certificate.issue_date,
              expiry_date: certificate.expiry_date,
              status: certificate.status,
              credential_id: certificate.credential_id
            }
          }
        });
      }
    );
  } catch (error) {
    logger.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;