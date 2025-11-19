import { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users, 
  Calendar,
  Filter,
  Search,
  Star,
  Zap,
  Target,
  Award,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('all-time');
  const [category, setCategory] = useState('overall');
  const [searchQuery, setSearchQuery] = useState('');

  const leaderboardData = [
    {
      rank: 1,
      name: 'Alex Chen',
      username: '@alexchen_ai',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 15420,
      examsCompleted: 47,
      skillsMastered: 12,
      streak: 28,
      badge: 'AI Master',
      change: 0,
      country: 'USA'
    },
    {
      rank: 2,
      name: 'Sarah Johnson',
      username: '@sarah_ml',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 14850,
      examsCompleted: 42,
      skillsMastered: 11,
      streak: 21,
      badge: 'ML Expert',
      change: 1,
      country: 'Canada'
    },
    {
      rank: 3,
      name: 'David Kim',
      username: '@david_vision',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 14200,
      examsCompleted: 39,
      skillsMastered: 10,
      streak: 19,
      badge: 'CV Specialist',
      change: -1,
      country: 'South Korea'
    },
    {
      rank: 4,
      name: 'Emily Rodriguez',
      username: '@emily_nlp',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 13750,
      examsCompleted: 36,
      skillsMastered: 9,
      streak: 15,
      badge: 'NLP Pro',
      change: 2,
      country: 'Spain'
    },
    {
      rank: 5,
      name: 'Michael Zhang',
      username: '@mike_data',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 13200,
      examsCompleted: 34,
      skillsMastered: 8,
      streak: 12,
      badge: 'Data Guru',
      change: 0,
      country: 'China'
    },
    {
      rank: 6,
      name: 'Lisa Anderson',
      username: '@lisa_ai',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 12800,
      examsCompleted: 31,
      skillsMastered: 7,
      streak: 9,
      badge: 'AI Enthusiast',
      change: 1,
      country: 'UK'
    },
    {
      rank: 7,
      name: 'James Wilson',
      username: '@james_deep',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 12350,
      examsCompleted: 29,
      skillsMastered: 6,
      streak: 7,
      badge: 'Deep Learner',
      change: -2,
      country: 'Australia'
    },
    {
      rank: 8,
      name: 'Maria Garcia',
      username: '@maria_stats',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 11900,
      examsCompleted: 27,
      skillsMastered: 6,
      streak: 5,
      badge: 'Stats Master',
      change: 3,
      country: 'Mexico'
    },
    {
      rank: 9,
      name: 'Robert Taylor',
      username: '@rob_neural',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 11450,
      examsCompleted: 25,
      skillsMastered: 5,
      streak: 4,
      badge: 'Neural Net',
      change: 0,
      country: 'Germany'
    },
    {
      rank: 10,
      name: 'You',
      username: '@skillmaster_42',
      avatar: null,
      points: 12500,
      examsCompleted: 18,
      skillsMastered: 4,
      streak: 14,
      badge: 'Rising Star',
      change: 5,
      country: 'Your Country',
      isCurrentUser: true
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ChevronUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ChevronDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'AI Master': 'bg-purple-100 text-purple-800',
      'ML Expert': 'bg-blue-100 text-blue-800',
      'CV Specialist': 'bg-green-100 text-green-800',
      'NLP Pro': 'bg-orange-100 text-orange-800',
      'Data Guru': 'bg-cyan-100 text-cyan-800',
      'AI Enthusiast': 'bg-pink-100 text-pink-800',
      'Deep Learner': 'bg-indigo-100 text-indigo-800',
      'Stats Master': 'bg-red-100 text-red-800',
      'Neural Net': 'bg-yellow-100 text-yellow-800',
      'Rising Star': 'bg-violet-100 text-violet-800'
    };
    return colors[badge] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                Global Leaderboard
              </h1>
              <p className="text-gray-600 mt-1">Compete with learners worldwide and track your progress</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 rounded-lg border border-violet-200">
                <div className="text-sm text-violet-700 font-medium">Your Rank: #10</div>
                <div className="text-xs text-violet-600">↑5 this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="all-time">All Time</option>
                  <option value="this-month">This Month</option>
                  <option value="this-week">This Week</option>
                  <option value="today">Today</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="overall">Overall</option>
                  <option value="machine-learning">Machine Learning</option>
                  <option value="deep-learning">Deep Learning</option>
                  <option value="nlp">Natural Language Processing</option>
                  <option value="computer-vision">Computer Vision</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="md:order-1 bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-gray-300"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{leaderboardData[1].name}</h3>
              <p className="text-sm text-gray-600 mb-2">{leaderboardData[1].username}</p>
              <div className="text-2xl font-bold text-gray-700 mb-2">{leaderboardData[1].points.toLocaleString()}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(leaderboardData[1].badge)}`}>
                {leaderboardData[1].badge}
              </div>
            </div>

            {/* 1st Place */}
            <div className="md:order-2 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 p-6 text-center hover:shadow-lg transition-shadow transform md:-translate-y-4">
              <div className="relative mb-4">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400"
                />
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-lg">{leaderboardData[0].name}</h3>
              <p className="text-sm text-gray-600 mb-2">{leaderboardData[0].username}</p>
              <div className="text-3xl font-bold text-yellow-600 mb-2">{leaderboardData[0].points.toLocaleString()}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(leaderboardData[0].badge)}`}>
                {leaderboardData[0].badge}
              </div>
            </div>

            {/* 3rd Place */}
            <div className="md:order-3 bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-amber-600"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{leaderboardData[2].name}</h3>
              <p className="text-sm text-gray-600 mb-2">{leaderboardData[2].username}</p>
              <div className="text-2xl font-bold text-amber-600 mb-2">{leaderboardData[2].points.toLocaleString()}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(leaderboardData[2].badge)}`}>
                {leaderboardData[2].badge}
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Full Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exams</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((user) => (
                  <tr 
                    key={user.rank} 
                    className={`hover:bg-gray-50 transition-colors ${
                      user.isCurrentUser ? 'bg-violet-50 border-l-4 border-violet-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                        {user.isCurrentUser && (
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full font-medium">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-gray-900">{user.points.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user.examsCompleted}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user.skillsMastered}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-900">{user.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {getChangeIcon(user.change)}
                        <span className={`text-sm font-medium ${
                          user.change > 0 ? 'text-green-600' : 
                          user.change < 0 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {user.change === 0 ? '-' : Math.abs(user.change)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">25,847</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </div>
            <div className="text-sm text-green-600">↑ 12% this month</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1.2M</div>
                <div className="text-sm text-gray-600">Exams Completed</div>
              </div>
            </div>
            <div className="text-sm text-green-600">↑ 8% this month</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">45,230</div>
                <div className="text-sm text-gray-600">Skills Mastered</div>
              </div>
            </div>
            <div className="text-sm text-green-600">↑ 15% this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}