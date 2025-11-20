import { useState } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  Settings, 
  LogOut, 
  User, 
  BarChart3, 
  Zap,
  Clock,
  Star,
  ChevronRight,
  Play,
  Menu,
  X,
  Bell,
  Search,
  Filter,
  Download,
  Share2,
  Plus,
  Brain,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function Dashboard({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'skills', label: 'Skills', icon: Target, action: () => onNavigate('skills') },
    { id: 'exams', label: 'Exams', icon: BookOpen, action: () => onNavigate('exam-generator') },
    { id: 'exam-status', label: 'Exam Status', icon: Clock, action: () => onNavigate('exam-status') },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, action: () => onNavigate('analytics') },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, action: () => onNavigate('leaderboard') },
    { id: 'achievements', label: 'Achievements', icon: Award, action: () => onNavigate('achievements') },
    { id: 'certificates', label: 'Certificates', icon: Award, action: () => onNavigate('certificates') },
    { id: 'profile', label: 'Profile', icon: User, action: () => onNavigate('profile') }
  ];

  // Add admin/instructor panels based on user role
  const userRole = user?.role || 'student'; // Default to student
  if (userRole === 'admin') {
    sidebarItems.push({ id: 'admin', label: 'Admin Panel', icon: Shield, action: () => onNavigate('admin') });
  }
  if (userRole === 'instructor' || userRole === 'admin') {
    sidebarItems.push({ id: 'instructor', label: 'Instructor Panel', icon: BookOpen, action: () => onNavigate('instructor') });
  }

  const stats = [
    { label: 'Current Streak', value: '14', unit: 'days', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Total Points', value: '12,500', unit: '', icon: Star, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Exams Completed', value: '18', unit: '', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Mastered Skills', value: '4', unit: '', icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recommendedSkills = [
    {
      title: 'Foundational Machine Learning',
      level: 'Intermediate',
      progress: 75,
      description: 'Covers regression, classification, clustering, and performance metrics. Essential for all AI professionals.',
      tags: ['Linear', 'Python', 'Data Science'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedTime: '2 hours',
      difficulty: 'Medium'
    },
    {
      title: 'Natural Language Processing (NLP)',
      level: 'Expert',
      progress: 45,
      description: 'Focuses on transformer models, embeddings, sentiment analysis, and sequence-to-sequence tasks.',
      tags: ['Advanced', 'Transformers', 'Python'],
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedTime: '3 hours',
      difficulty: 'Hard'
    },
    {
      title: 'Computer Vision & GANs',
      level: 'Expert',
      progress: 92,
      description: 'Deep dive into CNNs, image recognition, object detection, and generative adversarial networks (GANs).',
      tags: ['Vision', 'Deep Learning', 'TensorFlow'],
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedTime: '4 hours',
      difficulty: 'Hard'
    }
  ];

  const recentActivity = [
    {
      title: 'Prompt Engineering Novice Test',
      subject: 'Prompt Engineering',
      score: 98,
      level: 'Novice',
      date: 'Nov 16',
      time: '2:30 PM',
      duration: '45 min'
    },
    {
      title: 'NLP Transformer Model Exam',
      subject: 'Natural Language Processing',
      score: 65,
      level: 'Expert',
      date: 'Nov 14',
      time: '10:15 AM',
      duration: '90 min'
    },
    {
      title: 'CNN Fundamentals Quiz',
      subject: 'Computer Vision',
      score: 88,
      level: 'Intermediate',
      date: 'Nov 12',
      time: '4:45 PM',
      duration: '60 min'
    }
  ];

  const quickActions = [
    { title: 'Generate AI Exam', icon: Brain, color: 'bg-violet-600', action: () => onNavigate('exam-generator') },
    { title: 'View Analytics', icon: BarChart3, color: 'bg-blue-600', action: () => onNavigate('analytics') },
    { title: 'Global Leaderboard', icon: Trophy, color: 'bg-yellow-600', action: () => onNavigate('leaderboard') },
    { title: 'My Achievements', icon: Award, color: 'bg-green-600', action: () => onNavigate('achievements') }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Novice': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-violet-600" />
              <span className="text-lg font-bold text-gray-900">SkillForge AI</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-600">User Portal</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveTab(item.id);
                    }
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Settings */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{user?.name || 'SkillMaster_42'}</div>
              <div className="text-sm text-gray-600 truncate">{user?.email || 'user@example.com'}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => onNavigate('profile')}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Good morning, <span className="text-violet-600">SkillMaster</span>!
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  You're on a 14-day learning streak. Keep it up! 🔥
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none w-64"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={() => onNavigate('exam-generator')}
                className="hidden sm:flex bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden md:inline">Generate Exam</span>
              </button>
              
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-3 sm:px-4 py-2 rounded-lg font-medium border border-gray-300 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Skill</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${stat.bg}`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{stat.unit}</div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-700">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`${action.color} hover:opacity-90 text-white p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      >
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 mx-auto" />
                        <div className="text-sm sm:text-base font-medium text-center">{action.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Skills */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recommended Skills</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Based on your learning history and interests</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1 text-sm sm:text-base">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {recommendedSkills.map((skill, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="h-32 sm:h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        <img 
                          src={skill.image} 
                          alt={skill.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}>
                            {skill.difficulty}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{skill.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">{skill.description}</p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                          {skill.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                            <span className="text-gray-600">Mastery Level</span>
                            <span className="font-medium text-gray-900">{skill.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => onNavigate('exam-generator')}
                            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <Zap className="w-4 h-4" />
                            Generate Exam
                          </button>
                          <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Your latest exam results and performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => onNavigate('analytics')}
                      className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1 text-sm sm:text-base"
                    >
                      View Analytics <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-violet-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">{activity.title}</h3>
                          <p className="text-sm text-gray-600">{activity.subject}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 sm:flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(activity.level)}`}>
                          {activity.level}
                        </span>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                            {activity.score}%
                          </div>
                          <div className="text-sm text-gray-600">{activity.date}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Other tab content will be rendered here */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-gray-500 mb-4">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label} Page
              </h3>
              <p className="text-gray-600 mb-6">
                Navigate using the sidebar to access this feature.
              </p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}