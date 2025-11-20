import { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';

export default function InstructorPanel({ onBack, onCreateExam }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'exams', label: 'My Exams', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'content', label: 'Content', icon: Target }
  ];

  const stats = [
    { label: 'Total Exams', value: '24', change: '+3', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Students', value: '156', change: '+12', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Avg. Score', value: '87%', change: '+5%', icon: Target, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Certificates Issued', value: '89', change: '+8', icon: Award, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const myExams = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      category: 'Supervised Learning',
      difficulty: 'Intermediate',
      questions: 20,
      timeLimit: 45,
      students: 45,
      avgScore: 85,
      status: 'Active',
      created: '2024-01-10',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Deep Neural Networks',
      category: 'Neural Networks',
      difficulty: 'Expert',
      questions: 25,
      timeLimit: 60,
      students: 32,
      avgScore: 78,
      status: 'Active',
      created: '2024-01-08',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      title: 'Computer Vision Basics',
      category: 'Image Processing',
      difficulty: 'Novice',
      questions: 15,
      timeLimit: 30,
      students: 28,
      avgScore: 92,
      status: 'Draft',
      created: '2024-01-12',
      lastUpdated: '2024-01-16'
    }
  ];

  const recentStudents = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', examsCompleted: 5, avgScore: 92, lastActive: '2024-01-16' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', examsCompleted: 3, avgScore: 78, lastActive: '2024-01-15' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', examsCompleted: 7, avgScore: 88, lastActive: '2024-01-16' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', examsCompleted: 2, avgScore: 65, lastActive: '2024-01-14' }
  ];

  const recentActivity = [
    { type: 'exam_completed', student: 'Alice Johnson', exam: 'ML Fundamentals', score: 95, time: '2 hours ago' },
    { type: 'new_enrollment', student: 'Emma Brown', exam: 'Deep Learning', time: '4 hours ago' },
    { type: 'exam_completed', student: 'Bob Smith', exam: 'Computer Vision', score: 82, time: '6 hours ago' },
    { type: 'question_flagged', student: 'Carol Davis', exam: 'ML Fundamentals', time: '1 day ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'exam_completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'new_enrollment': return <Users className="w-4 h-4 text-blue-600" />;
      case 'question_flagged': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
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
                  <BookOpen className="w-8 h-8 text-green-600" />
                  Instructor Panel
                </h1>
                <p className="text-gray-600 mt-1">Manage your exams, students, and course content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onCreateExam}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Exam
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${stat.color}`} />
                          </div>
                          <span className="text-sm font-medium text-green-600">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.type === 'exam_completed' && `${activity.student} completed ${activity.exam}`}
                            {activity.type === 'new_enrollment' && `${activity.student} enrolled in ${activity.exam}`}
                            {activity.type === 'question_flagged' && `${activity.student} flagged a question in ${activity.exam}`}
                          </div>
                          {activity.score && (
                            <div className={`text-sm font-medium ${getScoreColor(activity.score)}`}>
                              Score: {activity.score}%
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={onCreateExam}
                    className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Exam
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    View Students
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analytics
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Import Content
                  </button>
                </div>
              </div>
            )}

            {/* Exams Tab */}
            {activeTab === 'exams' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search exams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={onCreateExam}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create Exam
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {myExams.map((exam) => (
                    <div key={exam.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(exam.status)}`}>
                            {exam.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(exam.difficulty)}`}>
                            {exam.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div>Category: {exam.category}</div>
                        <div>Questions: {exam.questions} • Time: {exam.timeLimit}m</div>
                        <div>Students: {exam.students} • Avg Score: {exam.avgScore}%</div>
                        <div>Created: {exam.created}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="flex-1 bg-white hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="p-2 border border-gray-300 hover:bg-red-50 hover:border-red-300 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">Student Management</h3>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exams</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.examsCompleted}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getScoreColor(student.avgScore)}`}>
                              {student.avgScore}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.lastActive}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <BarChart3 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Other tabs content */}
            {(activeTab === 'analytics' || activeTab === 'content') && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600">
                  Advanced {activeTab} features are coming soon. Stay tuned for powerful insights and content management tools.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}