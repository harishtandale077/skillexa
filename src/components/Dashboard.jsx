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
  Play
} from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'skills', label: 'Skills', icon: Target },
    { id: 'exams', label: 'Exams', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  const stats = [
    { label: 'Current Streak', value: '14', unit: 'days', icon: Zap, color: 'text-orange-600' },
    { label: 'Total Points', value: '12,500', unit: '', icon: Star, color: 'text-blue-600' },
    { label: 'Exams Completed', value: '18', unit: '', icon: BookOpen, color: 'text-green-600' },
    { label: 'Mastered Skills', value: '4', unit: '', icon: Trophy, color: 'text-purple-600' },
  ];

  const recommendedSkills = [
    {
      title: 'Foundational Machine Learning',
      level: 'Intermediate',
      progress: 75,
      description: 'Covers regression, classification, clustering, and performance metrics. Essential for all AI professionals.',
      tags: ['Linear', 'Python', 'Data Science'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Natural Language Processing (NLP)',
      level: 'Expert',
      progress: 45,
      description: 'Focuses on transformer models, embeddings, sentiment analysis, and sequence-to-sequence tasks.',
      tags: ['Advanced', 'Transformers', 'Python'],
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Computer Vision & GANs',
      level: 'Expert',
      progress: 92,
      description: 'Deep dive into CNNs, image recognition, object detection, and generative adversarial networks (GANs).',
      tags: ['Vision', 'Deep Learning', 'TensorFlow'],
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentActivity = [
    {
      title: 'Prompt Engineering Novice Test',
      subject: 'Prompt Engineering',
      score: 98,
      level: 'Novice',
      date: 'Nov 16'
    },
    {
      title: 'NLP Transformer Model Exam',
      subject: 'Natural Language Processing',
      score: 65,
      level: 'Expert',
      date: 'Nov 14'
    },
    {
      title: 'CNN Fundamentals Quiz',
      subject: 'Computer Vision',
      score: 88,
      level: 'Intermediate',
      date: 'Nov 12'
    }
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img
              src="/skillforge-logo.png"
              alt="SkillForge AI"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-gray-900">SkillForge AI</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">User Portal</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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
            <div>
              <div className="font-medium text-gray-900">{user?.name || 'SkillMaster_42'}</div>
              <div className="text-sm text-gray-600">{user?.email || 'user@example.com'}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
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
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good morning, <span className="text-violet-600">SkillMaster_42</span>!
              </h1>
              <p className="text-gray-600 mt-1">
                You're on a 14-day learning streak. Keep it up! 🔥
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                Explore Skills
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-2 rounded-lg font-medium border border-gray-300 transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Generate Exam
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.unit}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Recommended Skills */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recommended Skills</h2>
                <p className="text-gray-600">Based on your learning history and interests</p>
              </div>
              <button className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recommendedSkills.map((skill, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                    <img 
                      src={skill.image} 
                      alt={skill.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{skill.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skill.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
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

                    <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Generate Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600">Your latest exam results and performance</p>
              </div>
              <button className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                View Analytics <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(activity.level)}`}>
                      {activity.level}
                    </span>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                        {activity.score}%
                      </div>
                      <div className="text-sm text-gray-600">{activity.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}