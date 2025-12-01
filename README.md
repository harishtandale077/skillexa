# SkillForge AI - Enterprise Learning Management System

A comprehensive, production-ready learning management system built with modern web technologies and enterprise-level architecture.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - JWT-based auth with role management
- **Skills Management** - Comprehensive skill library with progress tracking
- **AI-Powered Exam Generation** - Dynamic exam creation with customizable parameters
- **Real-time Analytics** - Performance tracking and insights
- **Certificate Management** - Digital certificates with verification
- **Leaderboard System** - Global and category-based rankings
- **Achievement System** - Gamified learning with unlockable achievements
- **Admin & Instructor Panels** - Role-based management interfaces

### Technical Features
- **Responsive Design** - Mobile-first approach with full device compatibility
- **Real-time Updates** - Live notifications and progress tracking
- **File Upload/Download** - Secure file handling with progress indicators
- **Search & Filtering** - Advanced search capabilities across all entities
- **Pagination** - Efficient data loading for large datasets
- **Caching** - Redis-based caching for improved performance
- **Logging & Monitoring** - Comprehensive logging with Winston
- **Rate Limiting** - API protection against abuse
- **Security** - HTTPS, CORS, input sanitization, XSS protection

## 🏗️ Architecture

### Backend Stack
- **Node.js** with Express.js framework
- **SQLite** database with comprehensive schema
- **JWT** for authentication
- **Redis** for caching and sessions
- **Winston** for logging
- **Joi** for input validation
- **Multer** for file uploads
- **Helmet** for security headers

### Frontend Stack
- **React 18** with modern hooks
- **TypeScript** for type safety
- **Zustand** for state management
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Framer Motion** for animations

### DevOps & Deployment
- **Docker** containerization with multi-stage builds
- **Docker Compose** for local development
- **Nginx** reverse proxy configuration
- **Health checks** and graceful shutdown
- **Environment configuration** management
- **CI/CD ready** with comprehensive testing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose (optional)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd skillforge-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development servers**
```bash
# Start backend server
npm run server:dev

# Start frontend development server (in another terminal)
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

2. **Access the application**
- Application: http://localhost:5000
- Redis: localhost:6379

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts with roles and profiles
- **skills** - Skill library with categories and metadata
- **exams** - Exam instances with status tracking
- **questions** - Exam questions with options and explanations
- **user_answers** - User responses and performance data
- **certificates** - Digital certificates with verification
- **achievements** - Achievement definitions and user unlocks
- **activity_logs** - Comprehensive audit trail

### Relationships
- Users can enroll in multiple skills
- Skills can have multiple exams
- Exams contain multiple questions
- Users can earn certificates and achievements
- All activities are logged for analytics

## 🔐 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/auth/me - Get current user profile
POST /api/auth/refresh - Refresh JWT token
POST /api/auth/logout - User logout
```

### Skills Endpoints
```
GET /api/skills - Get all skills (with filtering)
GET /api/skills/:id - Get skill by ID
POST /api/skills/:id/enroll - Enroll in skill
PATCH /api/skills/:id/progress - Update progress
GET /api/skills/user/enrolled - Get user's enrolled skills
```

### Exams Endpoints
```
POST /api/exams - Create new exam
GET /api/exams - Get all exams
GET /api/exams/:id - Get exam by ID
POST /api/exams/:id/submit - Submit exam answers
GET /api/exams/:id/results - Get exam results
```

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- Unit tests for all API endpoints
- Integration tests for complete workflows
- Authentication and authorization tests
- Database operation tests
- Error handling tests

## 🚀 Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
LOG_LEVEL=info
REDIS_URL=redis://localhost:6379
```

### Production Deployment

1. **Build the application**
```bash
npm run build
```

2. **Deploy with Docker**
```bash
docker build -t skillforge-ai .
docker run -p 5000:5000 skillforge-ai
```

3. **Deploy to cloud platforms**
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring & Logging

### Health Checks
- Application health endpoint: `/api/health`
- Database connectivity check
- Redis connectivity check
- System resource monitoring

### Logging
- Structured JSON logging with Winston
- Separate error and combined logs
- Request/response logging with Morgan
- Configurable log levels

### Metrics
- API response times
- Error rates and types
- User activity patterns
- System resource usage

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Token refresh mechanism
- Secure password hashing with bcrypt

### API Security
- Rate limiting per IP
- CORS configuration
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Data Protection
- Encrypted sensitive data
- Secure file upload handling
- Environment variable protection
- Database connection security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints
- Check the health endpoint for system status

## 🎯 Roadmap

### Upcoming Features
- Real-time collaboration
- Video content integration
- Mobile app development
- Advanced analytics dashboard
- AI-powered recommendations
- Multi-language support
- Integration with external LMS platforms

---

Built with ❤️ by the SkillForge AI Team