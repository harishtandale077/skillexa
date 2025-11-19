import { useState } from 'react';
import { Award, Trophy, Star, Medal, Crown, Target, Zap, BookOpen, Users, Calendar, Lock, CheckCircle, Cross as Progress, Filter, Search } from 'lucide-react';

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first exam',
      icon: BookOpen,
      category: 'milestone',
      points: 100,
      rarity: 'common',
      unlocked: true,
      unlockedDate: '2024-01-10',
      progress: 100,
      requirement: 'Complete 1 exam'
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Score 90% or higher on your first exam',
      icon: Zap,
      category: 'performance',
      points: 250,
      rarity: 'uncommon',
      unlocked: true,
      unlockedDate: '2024-01-10',
      progress: 100,
      requirement: 'Score 90%+ on first exam'
    },
    {
      id: 3,
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: Target,
      category: 'consistency',
      points: 300,
      rarity: 'uncommon',
      unlocked: true,
      unlockedDate: '2024-01-15',
      progress: 100,
      requirement: 'Learn for 7 consecutive days'
    },
    {
      id: 4,
      title: 'ML Novice',
      description: 'Complete 5 Machine Learning exams',
      icon: Award,
      category: 'skill',
      points: 500,
      rarity: 'rare',
      unlocked: true,
      unlockedDate: '2024-01-20',
      progress: 100,
      requirement: 'Complete 5 ML exams'
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Achieve 100% on any exam',
      icon: Star,
      category: 'performance',
      points: 750,
      rarity: 'rare',
      unlocked: false,
      progress: 92,
      requirement: 'Score 100% on any exam'
    },
    {
      id: 6,
      title: 'Speed Demon',
      description: 'Complete an exam in under 15 minutes',
      icon: Zap,
      category: 'performance',
      points: 400,
      rarity: 'uncommon',
      unlocked: false,
      progress: 67,
      requirement: 'Complete exam in <15 minutes'
    },
    {
      id: 7,
      title: 'Knowledge Seeker',
      description: 'Complete exams in 5 different skill areas',
      icon: BookOpen,
      category: 'exploration',
      points: 600,
      rarity: 'rare',
      unlocked: false,
      progress: 80,
      requirement: 'Complete exams in 5 skill areas'
    },
    {
      id: 8,
      title: 'Dedication',
      description: 'Maintain a 30-day learning streak',
      icon: Calendar,
      category: 'consistency',
      points: 1000,
      rarity: 'epic',
      unlocked: false,
      progress: 47,
      requirement: 'Learn for 30 consecutive days'
    },
    {
      id: 9,
      title: 'AI Master',
      description: 'Achieve mastery in all core AI skills',
      icon: Crown,
      category: 'mastery',
      points: 2500,
      rarity: 'legendary',
      unlocked: false,
      progress: 25,
      requirement: 'Master all core AI skills'
    },
    {
      id: 10,
      title: 'Community Helper',
      description: 'Help 10 other learners in forums',
      icon: Users,
      category: 'social',
      points: 300,
      rarity: 'uncommon',
      unlocked: false,
      progress: 30,
      requirement: 'Help 10 learners in forums'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Achievements', count: achievements.length },
    { id: 'milestone', name: 'Milestones', count: achievements.filter(a => a.category === 'milestone').length },
    { id: 'performance', name: 'Performance', count: achievements.filter(a => a.category === 'performance').length },
    { id: 'consistency', name: 'Consistency', count: achievements.filter(a => a.category === 'consistency').length },
    { id: 'skill', name: 'Skills', count: achievements.filter(a => a.category === 'skill').length },
    { id: 'exploration', name: 'Exploration', count: achievements.filter(a => a.category === 'exploration').length },
    { id: 'mastery', name: 'Mastery', count: achievements.filter(a => a.category === 'mastery').length },
    { id: 'social', name: 'Social', count: achievements.filter(a => a.category === 'social').length }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'uncommon': return 'border-green-300 bg-green-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityTextColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-700';
      case 'uncommon': return 'text-green-700';
      case 'rare': return 'text-blue-700';
      case 'epic': return 'text-purple-700';
      case 'legendary': return 'text-yellow-700';
      default: return 'text-gray-700';
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                Achievements
              </h1>
              <p className="text-gray-600 mt-1">Track your learning milestones and unlock rewards</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{unlockedCount}/{achievements.length}</div>
                <div className="text-sm text-gray-600">Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">{totalPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Search Achievements</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-violet-50 text-violet-700 border border-violet-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Progress Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm text-gray-600">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{unlockedCount}</div>
                    <div className="text-xs text-green-700">Unlocked</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-600">{achievements.length - unlockedCount}</div>
                    <div className="text-xs text-gray-700">Locked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                      achievement.unlocked 
                        ? `${getRarityColor(achievement.rarity)} hover:-translate-y-1` 
                        : 'border-gray-200 bg-gray-50 opacity-75'
                    }`}
                  >
                    {/* Rarity Badge */}
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      achievement.unlocked 
                        ? `${getRarityTextColor(achievement.rarity)} bg-white bg-opacity-80`
                        : 'text-gray-500 bg-gray-200'
                    }`}>
                      {achievement.rarity}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                      achievement.unlocked 
                        ? 'bg-white shadow-md' 
                        : 'bg-gray-200'
                    }`}>
                      {achievement.unlocked ? (
                        <Icon className={`w-8 h-8 ${getRarityTextColor(achievement.rarity)}`} />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className={`text-lg font-bold mb-2 ${
                        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        achievement.unlocked ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>

                    {/* Progress or Unlock Date */}
                    {achievement.unlocked ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">Unlocked</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">{achievement.requirement}</div>
                      </div>
                    )}

                    {/* Points */}
                    <div className={`absolute bottom-4 right-4 flex items-center gap-1 text-sm font-medium ${
                      achievement.unlocked ? getRarityTextColor(achievement.rarity) : 'text-gray-500'
                    }`}>
                      <Star className="w-4 h-4" />
                      <span>{achievement.points}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAchievements.length === 0 && (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No achievements found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}