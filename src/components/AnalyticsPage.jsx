import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  Zap,
  BookOpen,
  Star,
  Users,
  Download,
  Filter,
  ChevronDown,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const performanceData = [
    { month: 'Jan', score: 65, exams: 3 },
    { month: 'Feb', score: 72, exams: 5 },
    { month: 'Mar', score: 78, exams: 4 },
    { month: 'Apr', score: 85, exams: 6 },
    { month: 'May', score: 88, exams: 7 },
    { month: 'Jun', score: 92, exams: 5 }
  ];

  const skillBreakdown = [
    { skill: 'Machine Learning', mastery: 85, exams: 12, timeSpent: 24 },
    { skill: 'Deep Learning', mastery: 72, exams: 8, timeSpent: 18 },
    { skill: 'NLP', mastery: 68, exams: 6, timeSpent: 15 },
    { skill: 'Computer Vision', mastery: 45, exams: 4, timeSpent: 12 },
    { skill: 'Data Science', mastery: 78, exams: 9, timeSpent: 20 }
  ];

  const recentActivity = [
    {
      date: '2024-01-15',
      activity: 'Completed ML Fundamentals Exam',
      score: 92,
      timeSpent: 45,
      difficulty: 'Intermediate'
    },
    {
      date: '2024-01-14',
      activity: 'Started Deep Learning Course',
      score: null,
      timeSpent: 30,
      difficulty: 'Expert'
    },
    {
      date: '2024-01-13',
      activity: 'Completed NLP Quiz',
      score: 88,
      timeSpent: 25,
      difficulty: 'Expert'
    },
    {
      date: '2024-01-12',
      activity: 'Reviewed Computer Vision',
      score: null,
      timeSpent: 20,
      difficulty: 'Intermediate'
    }
  ];

  const stats = [
    {
      title: 'Average Score',
      value: '88%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Study Time',
      value: '24h',
      change: '+12h',
      trend: 'up',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Exams Completed',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Current Streak',
      value: '14',
      change: '+2',
      trend: 'up',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const getMasteryColor = (mastery) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Novice': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-violet-600" />
                Learning Analytics
              </h1>
              <p className="text-gray-600 mt-1">Track your progress and identify areas for improvement</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance Trend</h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="performance">Performance</option>
                  <option value="time">Study Time</option>
                  <option value="exams">Exams Completed</option>
                </select>
              </div>
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-2 mb-4">
              {performanceData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden" style={{ height: '200px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.score / 100) * 200}px` }}
                    ></div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                      {data.score}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-violet-600 rounded-full"></div>
                <span>Average Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Exams Taken</span>
              </div>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Skill Mastery</h2>
            <div className="space-y-4">
              {skillBreakdown.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                    <span className="text-sm text-gray-600">{skill.mastery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getMasteryColor(skill.mastery)}`}
                      style={{ width: `${skill.mastery}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{skill.exams} exams</span>
                    <span>{skill.timeSpent}h studied</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1">
              View All <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-violet-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900">{activity.activity}</div>
                  <div className="text-sm text-gray-600">{activity.date}</div>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  {activity.score && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{activity.score}%</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{activity.timeSpent}m</span>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                    {activity.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Insights
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800 mb-1">Strong Performance</div>
                <div className="text-sm text-green-700">Your average score has improved by 15% over the last month. Keep up the excellent work!</div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-800 mb-1">Consistent Learning</div>
                <div className="text-sm text-blue-700">You've maintained a 14-day learning streak. Consistency is key to mastery!</div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-yellow-800 mb-1">Focus Area</div>
                <div className="text-sm text-yellow-700">Computer Vision shows the most room for improvement. Consider taking more practice exams.</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-600" />
              Recommendations
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Take Computer Vision Exam</div>
                  <div className="text-sm text-gray-600">Boost your weakest skill area with targeted practice</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Earn ML Certification</div>
                  <div className="text-sm text-gray-600">You're 85% ready for the Machine Learning certification</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Join Study Group</div>
                  <div className="text-sm text-gray-600">Connect with peers studying similar topics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}