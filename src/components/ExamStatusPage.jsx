import { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  RotateCcw,
  Calendar,
  Target,
  BookOpen,
  Filter,
  Search,
  Eye,
  Download,
  Trash2
} from 'lucide-react';

export default function ExamStatusPage({ onBack, onStartExam }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const examStatuses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals - Expert Level',
      skill: 'Machine Learning',
      category: 'Supervised Learning',
      difficulty: 'Expert',
      questions: 20,
      timeLimit: 45,
      status: 'in-progress',
      progress: 65,
      questionsAnswered: 13,
      timeSpent: 28,
      startedAt: '2024-01-16T10:30:00Z',
      lastActivity: '2024-01-16T11:15:00Z',
      score: null,
      attempts: 1
    },
    {
      id: 2,
      title: 'Deep Learning Neural Networks - Intermediate',
      skill: 'Deep Learning',
      category: 'Neural Networks',
      difficulty: 'Intermediate',
      questions: 15,
      timeLimit: 30,
      status: 'completed',
      progress: 100,
      questionsAnswered: 15,
      timeSpent: 28,
      startedAt: '2024-01-15T14:00:00Z',
      completedAt: '2024-01-15T14:28:00Z',
      score: 88,
      attempts: 1
    },
    {
      id: 3,
      title: 'Natural Language Processing - Expert Level',
      skill: 'NLP',
      category: 'Transformers',
      difficulty: 'Expert',
      questions: 25,
      timeLimit: 60,
      status: 'scheduled',
      progress: 0,
      questionsAnswered: 0,
      timeSpent: 0,
      scheduledFor: '2024-01-17T09:00:00Z',
      score: null,
      attempts: 0
    },
    {
      id: 4,
      title: 'Computer Vision Basics - Novice Level',
      skill: 'Computer Vision',
      category: 'Image Processing',
      difficulty: 'Novice',
      questions: 10,
      timeLimit: 20,
      status: 'failed',
      progress: 100,
      questionsAnswered: 10,
      timeSpent: 18,
      startedAt: '2024-01-14T16:00:00Z',
      completedAt: '2024-01-14T16:18:00Z',
      score: 45,
      attempts: 2
    },
    {
      id: 5,
      title: 'Data Science Pipeline - Intermediate',
      skill: 'Data Science',
      category: 'MLOps',
      difficulty: 'Intermediate',
      questions: 18,
      timeLimit: 40,
      status: 'expired',
      progress: 30,
      questionsAnswered: 5,
      timeSpent: 12,
      startedAt: '2024-01-13T11:00:00Z',
      expiredAt: '2024-01-13T11:40:00Z',
      score: null,
      attempts: 1
    },
    {
      id: 6,
      title: 'Reinforcement Learning - Master Level',
      skill: 'Machine Learning',
      category: 'Reinforcement Learning',
      difficulty: 'Master',
      questions: 30,
      timeLimit: 90,
      status: 'draft',
      progress: 0,
      questionsAnswered: 0,
      timeSpent: 0,
      createdAt: '2024-01-16T08:00:00Z',
      score: null,
      attempts: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      case 'draft': return <BookOpen className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Novice': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const filteredExams = examStatuses.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.skill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedExams = [...filteredExams].sort((a, b) => {
    switch (sortBy) {
      case 'date': 
        const dateA = new Date(a.startedAt || a.scheduledFor || a.createdAt);
        const dateB = new Date(b.startedAt || b.scheduledFor || b.createdAt);
        return dateB - dateA;
      case 'score': return (b.score || 0) - (a.score || 0);
      case 'title': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const stats = [
    { 
      label: 'Total Exams', 
      value: examStatuses.length, 
      icon: BookOpen, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Completed', 
      value: examStatuses.filter(e => e.status === 'completed').length, 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      label: 'In Progress', 
      value: examStatuses.filter(e => e.status === 'in-progress').length, 
      icon: Play, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Average Score', 
      value: Math.round(examStatuses.filter(e => e.score).reduce((sum, e) => sum + e.score, 0) / examStatuses.filter(e => e.score).length) + '%', 
      icon: Target, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    }
  ];

  const handleExamAction = (exam, action) => {
    switch (action) {
      case 'continue':
      case 'start':
        onStartExam({
          skill: exam.skill,
          category: exam.category,
          difficulty: exam.difficulty,
          questions: exam.questions,
          timeLimit: exam.timeLimit
        });
        break;
      case 'retake':
        onStartExam({
          skill: exam.skill,
          category: exam.category,
          difficulty: exam.difficulty,
          questions: exam.questions,
          timeLimit: exam.timeLimit
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-violet-600" />
                  Exam Status
                </h1>
                <p className="text-gray-600 mt-1">Track your exam progress and manage ongoing assessments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="failed">Failed</option>
                  <option value="expired">Expired</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
              >
                <option value="date">Sort by Date</option>
                <option value="score">Sort by Score</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          {sortedExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Exam Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)} flex items-center gap-1`}>
                        {getStatusIcon(exam.status)}
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>{exam.skill} • {exam.category}</span>
                    <span>{exam.questions} questions</span>
                    <span>{exam.timeLimit} minutes</span>
                    {exam.attempts > 0 && <span>Attempt {exam.attempts}</span>}
                  </div>

                  {/* Progress Bar */}
                  {exam.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{exam.progress}% ({exam.questionsAnswered}/{exam.questions})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exam.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Exam Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {exam.score !== null && (
                      <span className={`font-medium ${getScoreColor(exam.score)}`}>
                        Score: {exam.score}%
                      </span>
                    )}
                    {exam.timeSpent > 0 && (
                      <span>Time spent: {exam.timeSpent}m</span>
                    )}
                    {exam.lastActivity && (
                      <span>Last activity: {formatTimeAgo(exam.lastActivity)}</span>
                    )}
                    {exam.scheduledFor && (
                      <span>Scheduled: {new Date(exam.scheduledFor).toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {exam.status === 'in-progress' && (
                    <button
                      onClick={() => handleExamAction(exam, 'continue')}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Continue
                    </button>
                  )}
                  
                  {exam.status === 'scheduled' && (
                    <button
                      onClick={() => handleExamAction(exam, 'start')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  )}
                  
                  {exam.status === 'draft' && (
                    <button
                      onClick={() => handleExamAction(exam, 'start')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  )}
                  
                  {(exam.status === 'failed' || exam.status === 'expired') && (
                    <button
                      onClick={() => handleExamAction(exam, 'retake')}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake
                    </button>
                  )}
                  
                  {exam.status === 'completed' && (
                    <>
                      <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleExamAction(exam, 'retake')}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Retake
                      </button>
                    </>
                  )}
                  
                  <button className="p-2 border border-gray-300 hover:bg-red-50 hover:border-red-300 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedExams.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}