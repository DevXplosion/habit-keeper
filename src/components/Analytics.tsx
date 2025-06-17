import React from 'react';
import { Habit } from '../types/habit';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';

interface AnalyticsProps {
  habits: Habit[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ habits }) => {
  const categoryStats = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = { count: 0, totalStreak: 0, completed: 0 };
    }
    acc[habit.category].count++;
    acc[habit.category].totalStreak += habit.streak;
    if (habit.completedToday) acc[habit.category].completed++;
    return acc;
  }, {} as Record<string, { count: number; totalStreak: number; completed: number }>);

  const getCategoryColor = (category: string) => {
    const colors = {
      health: '#3B82F6',
      fitness: '#EF4444',
      learning: '#10B981',
      mindfulness: '#8B5CF6',
      productivity: '#F59E0B',
      social: '#EC4899'
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      health: '💧',
      fitness: '💪',
      learning: '📚',
      mindfulness: '🧘',
      productivity: '💻',
      social: '📞'
    };
    return icons[category as keyof typeof icons] || '✨';
  };

  const bestPerformingHabit = habits.reduce((best, habit) =>
    habit.streak > best.streak ? habit : best
    , habits[0]);

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const completedCount = habits.filter(habit => habit.weeklyCompletion[i]).length;
    return {
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      completed: completedCount,
      percentage: habits.length > 0 ? (completedCount / habits.length) * 100 : 0
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Insights</h2>
        <p className="text-gray-600">Track your progress and identify patterns in your habits</p>
      </div>

      {/* Weekly Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <div
                  className="w-12 h-24 bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg mx-auto relative overflow-hidden"
                  style={{
                    background: `linear-gradient(to top, #3B82F6 0%, #3B82F6 ${day.percentage}%, #E5E7EB ${day.percentage}%, #E5E7EB 100%)`
                  }}
                >
                  <div className="absolute bottom-1 left-0 right-0 text-xs font-medium text-white">
                    {day.completed}
                  </div>
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600">{day.day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, stats]) => {
              const completionRate = (stats.completed / stats.count) * 100;
              return (
                <div key={category} className="flex items-center space-x-3">
                  <div className="text-xl">{getCategoryIcon(category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                      <span className="text-sm text-gray-500">{completionRate.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${completionRate}%`,
                          backgroundColor: getCategoryColor(category)
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{stats.completed}/{stats.count}</p>
                    <p className="text-xs text-gray-500">habits</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best Performing Habit */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Star Performer</h3>
          </div>

          {bestPerformingHabit && (
            <div className="text-center">
              <div className="text-4xl mb-3">{getCategoryIcon(bestPerformingHabit.category)}</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{bestPerformingHabit.name}</h4>
              <div className="inline-flex items-center space-x-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span>🔥</span>
                <span>{bestPerformingHabit.streak} day streak</span>
              </div>
              <p className="text-gray-600 text-sm">{bestPerformingHabit.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Habits List with Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Detailed Stats</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Habit</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Today</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Streak</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Weekly</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => {
                const weeklyCompletion = (habit.weeklyCompletion.filter(Boolean).length / 7) * 100;
                return (
                  <tr key={habit.id} className="border-b border-gray-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg">{getCategoryIcon(habit.category)}</div>
                        <div>
                          <p className="font-medium text-gray-900">{habit.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{habit.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${habit.todayProgress >= habit.goal
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600'
                        }`}>
                        {habit.todayProgress}/{habit.goal} {habit.unit}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-orange-500">🔥</span>
                        <span className="font-medium text-gray-900">{habit.streak}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="font-medium text-gray-900">{weeklyCompletion.toFixed(0)}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};