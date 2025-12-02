const express = require('express');
const Joi = require('joi');
const { getDatabase } = require('../database/init');
const { logger } = require('../utils/logger');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation schemas
const createExamSchema = Joi.object({
  skillId: Joi.number().integer().positive().required(),
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(500),
  difficulty: Joi.string().valid('Novice', 'Intermediate', 'Expert', 'Master').required(),
  questionsCount: Joi.number().integer().min(5).max(50).required(),
  timeLimit: Joi.number().integer().min(10).max(180).required()
});

const submitExamSchema = Joi.object({
  answers: Joi.array().items(Joi.number().integer().allow(null)).required(),
  timeSpent: Joi.number().integer().min(0).required()
});

// Create exam
router.post('/', authenticateToken, validateRequest(createExamSchema), (req, res) => {
  try {
    const db = getDatabase();
    const userId = req.user.userId;
    const { skillId, title, description, difficulty, questionsCount, timeLimit } = req.body;

    // Verify skill exists
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

      // Create exam
      db.run(
        `INSERT INTO exams (user_id, skill_id, title, description, difficulty, questions_count, time_limit)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, skillId, title, description, difficulty, questionsCount, timeLimit],
        function(err) {
          if (err) {
            logger.error('Error creating exam:', err);
            return res.status(500).json({
              success: false,
              message: 'Failed to create exam'
            });
          }

          const examId = this.lastID;

          // Generate sample questions based on difficulty and skill
          const sampleQuestions = generateSampleQuestions(difficulty, questionsCount);
          
          // Insert questions
          const questionStmt = db.prepare(
            'INSERT INTO questions (exam_id, question_text, options, correct_answer, explanation, points) VALUES (?, ?, ?, ?, ?, ?)'
          );

          sampleQuestions.forEach(question => {
            questionStmt.run([
              examId,
              question.question,
              JSON.stringify(question.options),
              question.correctAnswer,
              question.explanation,
              question.points
            ]);
          });

          questionStmt.finalize();

          logger.info(`Exam created: ${examId} by user ${userId}`);

          res.status(201).json({
            success: true,
            message: 'Exam created successfully',
            data: {
              examId,
              questionsGenerated: sampleQuestions.length
            }
          });
        }
      );
    });
  } catch (error) {
    logger.error('Create exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all exams with filtering
router.get('/', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const {
      page = 1,
      limit = 10,
      status,
      difficulty,
      skillId
    } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = 'WHERE e.user_id = ?';
    let params = [req.user.userId];

    // Build WHERE clause
    if (status) {
      whereClause += ' AND e.status = ?';
      params.push(status);
    }
    if (difficulty) {
      whereClause += ' AND e.difficulty = ?';
      params.push(difficulty);
    }
    if (skillId) {
      whereClause += ' AND e.skill_id = ?';
      params.push(skillId);
    }

    // Get total count
    db.get(
      `SELECT COUNT(*) as total FROM exams e ${whereClause}`,
      params,
      (err, countResult) => {
        if (err) {
          logger.error('Error counting exams:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        const total = countResult.total;

        // Get exams with pagination
        db.all(
          `SELECT 
            e.*,
            s.title as skill_title,
            s.category as skill_category
          FROM exams e
          JOIN skills s ON e.skill_id = s.id
          ${whereClause}
          ORDER BY e.created_at DESC
          LIMIT ? OFFSET ?`,
          [...params, parseInt(limit), offset],
          (err, exams) => {
            if (err) {
              logger.error('Error fetching exams:', err);
              return res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }

            res.json({
              success: true,
              data: {
                exams,
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
    logger.error('Get exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get exam by ID with questions
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const examId = req.params.id;
    const userId = req.user.userId;

    // Get exam details
    db.get(
      `SELECT 
        e.*,
        s.title as skill_title,
        s.category as skill_category
      FROM exams e
      JOIN skills s ON e.skill_id = s.id
      WHERE e.id = ? AND e.user_id = ?`,
      [examId, userId],
      (err, exam) => {
        if (err) {
          logger.error('Error fetching exam:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!exam) {
          return res.status(404).json({
            success: false,
            message: 'Exam not found'
          });
        }

        // Get questions for the exam
        db.all(
          'SELECT id, question_text, options, points FROM questions WHERE exam_id = ? ORDER BY id',
          [examId],
          (err, questions) => {
            if (err) {
              logger.error('Error fetching questions:', err);
              return res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }

            // Parse options JSON
            const processedQuestions = questions.map(question => ({
              ...question,
              options: JSON.parse(question.options)
            }));

            res.json({
              success: true,
              data: {
                exam,
                questions: processedQuestions
              }
            });
          }
        );
      }
    );
  } catch (error) {
    logger.error('Get exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Submit exam answers
router.post('/:id/submit', authenticateToken, validateRequest(submitExamSchema), (req, res) => {
  try {
    const db = getDatabase();
    const examId = req.params.id;
    const userId = req.user.userId;
    const { answers, timeSpent } = req.body;

    // Verify exam belongs to user and is active
    db.get(
      'SELECT * FROM exams WHERE id = ? AND user_id = ? AND status IN ("draft", "active")',
      [examId, userId],
      (err, exam) => {
        if (err) {
          logger.error('Error fetching exam for submission:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!exam) {
          return res.status(404).json({
            success: false,
            message: 'Exam not found or already completed'
          });
        }

        // Get questions with correct answers
        db.all(
          'SELECT id, correct_answer, points, explanation FROM questions WHERE exam_id = ? ORDER BY id',
          [examId],
          (err, questions) => {
            if (err) {
              logger.error('Error fetching questions for grading:', err);
              return res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }

            // Calculate score
            let correctAnswers = 0;
            let totalPoints = 0;
            let earnedPoints = 0;

            // Store user answers and calculate score
            const answerStmt = db.prepare(
              'INSERT INTO user_answers (exam_id, question_id, user_id, selected_answer, is_correct, time_spent) VALUES (?, ?, ?, ?, ?, ?)'
            );

            questions.forEach((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correct_answer;
              const questionTimeSpent = Math.round(timeSpent / questions.length);

              if (isCorrect) {
                correctAnswers++;
                earnedPoints += question.points;
              }
              totalPoints += question.points;

              answerStmt.run([
                examId,
                question.id,
                userId,
                userAnswer,
                isCorrect ? 1 : 0,
                questionTimeSpent
              ]);
            });

            answerStmt.finalize();

            // Calculate final score percentage
            const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

            // Update exam with results
            db.run(
              `UPDATE exams 
               SET status = 'completed', score = ?, completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`,
              [scorePercentage, examId],
              function(err) {
                if (err) {
                  logger.error('Error updating exam results:', err);
                  return res.status(500).json({
                    success: false,
                    message: 'Failed to save exam results'
                  });
                }

                // Update user points
                db.run(
                  'UPDATE users SET points = points + ? WHERE id = ?',
                  [earnedPoints, userId]
                );

                logger.info(`Exam submitted: ${examId} by user ${userId}, score: ${scorePercentage}%`);

                res.json({
                  success: true,
                  message: 'Exam submitted successfully',
                  data: {
                    score: scorePercentage,
                    correctAnswers,
                    totalQuestions: questions.length,
                    earnedPoints,
                    totalPoints,
                    timeSpent
                  }
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    logger.error('Submit exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get exam results
router.get('/:id/results', authenticateToken, (req, res) => {
  try {
    const db = getDatabase();
    const examId = req.params.id;
    const userId = req.user.userId;

    // Get exam with results
    db.get(
      `SELECT 
        e.*,
        s.title as skill_title,
        s.category as skill_category
      FROM exams e
      JOIN skills s ON e.skill_id = s.id
      WHERE e.id = ? AND e.user_id = ? AND e.status = 'completed'`,
      [examId, userId],
      (err, exam) => {
        if (err) {
          logger.error('Error fetching exam results:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!exam) {
          return res.status(404).json({
            success: false,
            message: 'Exam results not found'
          });
        }

        // Get detailed results
        db.all(
          `SELECT 
            q.question_text,
            q.options,
            q.correct_answer,
            q.explanation,
            q.points,
            ua.selected_answer,
            ua.is_correct,
            ua.time_spent
          FROM questions q
          LEFT JOIN user_answers ua ON q.id = ua.question_id AND ua.user_id = ?
          WHERE q.exam_id = ?
          ORDER BY q.id`,
          [userId, examId],
          (err, results) => {
            if (err) {
              logger.error('Error fetching detailed results:', err);
              return res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }

            // Process results
            const processedResults = results.map(result => ({
              ...result,
              options: JSON.parse(result.options)
            }));

            res.json({
              success: true,
              data: {
                exam,
                results: processedResults,
                summary: {
                  totalQuestions: results.length,
                  correctAnswers: results.filter(r => r.is_correct).length,
                  score: exam.score,
                  totalTimeSpent: results.reduce((sum, r) => sum + (r.time_spent || 0), 0)
                }
              }
            });
          }
        );
      }
    );
  } catch (error) {
    logger.error('Get exam results error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Helper function to generate sample questions
function generateSampleQuestions(difficulty, count) {
  const questionTemplates = {
    'Novice': [
      {
        question: "What is the primary goal of supervised learning?",
        options: ["To find hidden patterns", "To learn from labeled data", "To reduce data size", "To visualize data"],
        correctAnswer: 1,
        explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs.",
        points: 1
      },
      {
        question: "Which of the following is a classification algorithm?",
        options: ["Linear Regression", "Decision Tree", "K-Means", "PCA"],
        correctAnswer: 1,
        explanation: "Decision Tree is a classification algorithm that creates a tree-like model of decisions.",
        points: 1
      }
    ],
    'Intermediate': [
      {
        question: "What is the purpose of cross-validation in machine learning?",
        options: ["To increase training speed", "To evaluate model performance", "To reduce overfitting", "To select features"],
        correctAnswer: 1,
        explanation: "Cross-validation helps evaluate how well a model generalizes to unseen data.",
        points: 2
      },
      {
        question: "Which activation function is commonly used in hidden layers of deep neural networks?",
        options: ["Sigmoid", "ReLU", "Linear", "Step"],
        correctAnswer: 1,
        explanation: "ReLU (Rectified Linear Unit) is widely used because it helps mitigate the vanishing gradient problem.",
        points: 2
      }
    ],
    'Expert': [
      {
        question: "What key mechanism allows the Transformer model to weigh the importance of different words in the input sequence?",
        options: ["Recurrent Loop", "Attention Mechanism", "Convolutional Filter", "Max-Pooling Layers"],
        correctAnswer: 1,
        explanation: "The attention mechanism is the core innovation of Transformers, allowing the model to focus on relevant parts of the input sequence when processing each token.",
        points: 3
      },
      {
        question: "In a Transformer architecture, what is the purpose of positional encoding?",
        options: ["To reduce computational complexity", "To provide sequence order information", "To normalize input values", "To prevent overfitting"],
        correctAnswer: 1,
        explanation: "Since Transformers don't have inherent sequence order like RNNs, positional encoding is added to give the model information about token positions.",
        points: 3
      }
    ],
    'Master': [
      {
        question: "Which component of the Transformer processes all positions simultaneously rather than sequentially?",
        options: ["LSTM layers", "Self-attention mechanism", "Recurrent connections", "Sequential processing unit"],
        correctAnswer: 1,
        explanation: "Self-attention allows Transformers to process all positions in parallel, making them much more efficient than sequential models like RNNs.",
        points: 4
      }
    ]
  };

  const templates = questionTemplates[difficulty] || questionTemplates['Intermediate'];
  const questions = [];

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    questions.push({
      ...template,
      question: `${template.question} (Question ${i + 1})`
    });
  }

  return questions;
}

module.exports = router;