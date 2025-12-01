const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { logger } = require('../utils/logger');

const DB_PATH = path.join(__dirname, 'skillforge.db');

let db;

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        logger.error('Error opening database:', err);
        reject(err);
        return;
      }
      
      logger.info('Connected to SQLite database');
      createTables().then(resolve).catch(reject);
    });
  });
};

const createTables = () => {
  return new Promise((resolve, reject) => {
    const schema = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'student' CHECK(role IN ('student', 'instructor', 'admin')),
        avatar TEXT,
        bio TEXT,
        location TEXT,
        phone TEXT,
        website TEXT,
        linkedin TEXT,
        github TEXT,
        points INTEGER DEFAULT 0,
        streak INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT 1,
        email_verified BOOLEAN DEFAULT 0
      );

      -- Skills table
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        difficulty TEXT CHECK(difficulty IN ('Novice', 'Intermediate', 'Expert', 'Master')),
        image_url TEXT,
        topics TEXT, -- JSON array of topics
        estimated_hours INTEGER,
        popularity INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Exams table
      CREATE TABLE IF NOT EXISTS exams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        skill_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        difficulty TEXT CHECK(difficulty IN ('Novice', 'Intermediate', 'Expert', 'Master')),
        questions_count INTEGER NOT NULL,
        time_limit INTEGER NOT NULL, -- in minutes
        status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'completed', 'expired')),
        score INTEGER,
        started_at DATETIME,
        completed_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
      );

      -- Questions table
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exam_id INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        options TEXT NOT NULL, -- JSON array of options
        correct_answer INTEGER NOT NULL,
        explanation TEXT,
        points INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (exam_id) REFERENCES exams (id) ON DELETE CASCADE
      );

      -- User answers table
      CREATE TABLE IF NOT EXISTS user_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exam_id INTEGER NOT NULL,
        question_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        selected_answer INTEGER,
        is_correct BOOLEAN,
        time_spent INTEGER, -- in seconds
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (exam_id) REFERENCES exams (id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Certificates table
      CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        skill_id INTEGER NOT NULL,
        exam_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        score INTEGER NOT NULL,
        credential_id TEXT UNIQUE NOT NULL,
        issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        expiry_date DATETIME,
        status TEXT DEFAULT 'active' CHECK(status IN ('active', 'expired', 'revoked')),
        certificate_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE,
        FOREIGN KEY (exam_id) REFERENCES exams (id) ON DELETE CASCADE
      );

      -- User skills progress table
      CREATE TABLE IF NOT EXISTS user_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        skill_id INTEGER NOT NULL,
        progress INTEGER DEFAULT 0,
        mastery_level TEXT DEFAULT 'Novice',
        enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE,
        UNIQUE(user_id, skill_id)
      );

      -- Achievements table
      CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        category TEXT,
        points INTEGER DEFAULT 0,
        rarity TEXT CHECK(rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
        requirement_type TEXT, -- 'exam_count', 'score_threshold', 'streak', etc.
        requirement_value INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- User achievements table
      CREATE TABLE IF NOT EXISTS user_achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        achievement_id INTEGER NOT NULL,
        unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (achievement_id) REFERENCES achievements (id) ON DELETE CASCADE,
        UNIQUE(user_id, achievement_id)
      );

      -- Activity logs table
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        entity_type TEXT, -- 'exam', 'skill', 'certificate', etc.
        entity_id INTEGER,
        metadata TEXT, -- JSON data
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_exams_user_id ON exams(user_id);
      CREATE INDEX IF NOT EXISTS idx_exams_skill_id ON exams(skill_id);
      CREATE INDEX IF NOT EXISTS idx_questions_exam_id ON questions(exam_id);
      CREATE INDEX IF NOT EXISTS idx_user_answers_exam_id ON user_answers(exam_id);
      CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers(user_id);
      CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
      CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
    `;

    db.exec(schema, (err) => {
      if (err) {
        logger.error('Error creating tables:', err);
        reject(err);
        return;
      }
      
      logger.info('Database tables created successfully');
      seedDatabase().then(resolve).catch(reject);
    });
  });
};

const seedDatabase = () => {
  return new Promise((resolve, reject) => {
    // Check if data already exists
    db.get('SELECT COUNT(*) as count FROM skills', (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count > 0) {
        logger.info('Database already seeded');
        resolve();
        return;
      }

      // Seed skills data
      const skills = [
        {
          title: 'Machine Learning Fundamentals',
          description: 'Master the core concepts of supervised and unsupervised learning, including algorithms, evaluation metrics, and best practices.',
          category: 'machine-learning',
          difficulty: 'Intermediate',
          topics: JSON.stringify(['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering']),
          estimated_hours: 40,
          popularity: 95,
          image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          title: 'Deep Neural Networks',
          description: 'Dive deep into neural network architectures, backpropagation, optimization techniques, and advanced deep learning concepts.',
          category: 'deep-learning',
          difficulty: 'Expert',
          topics: JSON.stringify(['Neural Networks', 'Backpropagation', 'CNN', 'RNN', 'Optimization']),
          estimated_hours: 60,
          popularity: 88,
          image_url: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          title: 'Natural Language Processing',
          description: 'Learn text processing, sentiment analysis, language models, and transformer architectures for NLP applications.',
          category: 'nlp',
          difficulty: 'Expert',
          topics: JSON.stringify(['Text Processing', 'Transformers', 'BERT', 'GPT', 'Sentiment Analysis']),
          estimated_hours: 50,
          popularity: 92,
          image_url: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          title: 'Computer Vision Essentials',
          description: 'Explore image processing, object detection, facial recognition, and convolutional neural networks for vision tasks.',
          category: 'computer-vision',
          difficulty: 'Intermediate',
          topics: JSON.stringify(['Image Processing', 'Object Detection', 'CNN', 'OpenCV', 'Feature Extraction']),
          estimated_hours: 45,
          popularity: 85,
          image_url: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          title: 'Data Science Pipeline',
          description: 'Learn end-to-end data science workflows, from data collection and cleaning to model deployment and monitoring.',
          category: 'data-science',
          difficulty: 'Intermediate',
          topics: JSON.stringify(['Data Collection', 'Data Cleaning', 'EDA', 'Model Deployment', 'MLOps']),
          estimated_hours: 55,
          popularity: 90,
          image_url: 'https://images.pexels.com/photos/8386431/pexels-photo-8386431.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ];

      const skillInsertStmt = db.prepare(`
        INSERT INTO skills (title, description, category, difficulty, topics, estimated_hours, popularity, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      skills.forEach(skill => {
        skillInsertStmt.run([
          skill.title,
          skill.description,
          skill.category,
          skill.difficulty,
          skill.topics,
          skill.estimated_hours,
          skill.popularity,
          skill.image_url
        ]);
      });

      skillInsertStmt.finalize();

      // Seed achievements
      const achievements = [
        {
          title: 'First Steps',
          description: 'Complete your first exam',
          icon: 'BookOpen',
          category: 'milestone',
          points: 100,
          rarity: 'common',
          requirement_type: 'exam_count',
          requirement_value: 1
        },
        {
          title: 'Quick Learner',
          description: 'Score 90% or higher on your first exam',
          icon: 'Zap',
          category: 'performance',
          points: 250,
          rarity: 'uncommon',
          requirement_type: 'first_exam_score',
          requirement_value: 90
        },
        {
          title: 'Streak Master',
          description: 'Maintain a 7-day learning streak',
          icon: 'Target',
          category: 'consistency',
          points: 300,
          rarity: 'uncommon',
          requirement_type: 'streak',
          requirement_value: 7
        },
        {
          title: 'Perfect Score',
          description: 'Achieve 100% on any exam',
          icon: 'Star',
          category: 'performance',
          points: 750,
          rarity: 'rare',
          requirement_type: 'perfect_score',
          requirement_value: 100
        },
        {
          title: 'AI Master',
          description: 'Achieve mastery in all core AI skills',
          icon: 'Crown',
          category: 'mastery',
          points: 2500,
          rarity: 'legendary',
          requirement_type: 'skills_mastered',
          requirement_value: 5
        }
      ];

      const achievementInsertStmt = db.prepare(`
        INSERT INTO achievements (title, description, icon, category, points, rarity, requirement_type, requirement_value)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      achievements.forEach(achievement => {
        achievementInsertStmt.run([
          achievement.title,
          achievement.description,
          achievement.icon,
          achievement.category,
          achievement.points,
          achievement.rarity,
          achievement.requirement_type,
          achievement.requirement_value
        ]);
      });

      achievementInsertStmt.finalize();

      logger.info('Database seeded successfully');
      resolve();
    });
  });
};

const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = {
  initDatabase,
  getDatabase
};