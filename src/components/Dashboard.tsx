import React from 'react';
import { Habit, HabitStats } from '../types/habit';
import { HabitCard } from './HabitCard';
import { Target, TrendingUp, Calendar, Award } from 'lucide-react';

interface DashboardProps {
  habits: Habit[];
  stats: HabitStats;
  onToggleComplete: (id: string) => void;
  onUpdateProgress: (id: string, progress: number) => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  habits,
  stats,
  onToggleComplete,
  onUpdateProgress,
  onEditHabit,
  onDeleteHabit
}) => {
  const completionRate = stats.totalHabits > 0 ? (stats.completedToday / stats.totalHabits) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Progress</p>
              <p className="text-2xl font-bold text-gray-900">{completionRate.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}/{stats.totalHabits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Longest Streak</p>
              <p className="text-2xl font-bold text-gray-900">{stats.longestStreak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Weekly Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.weeklyCompletion}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Habits Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Habits</h2>
        <p className="text-gray-600">Track your daily progress and build lasting habits</p>
      </div>

      {habits.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No habits yet</h3>
          <p className="text-gray-600 mb-6">Start building better habits by adding your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleComplete={onToggleComplete}
              onUpdateProgress={onUpdateProgress}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
            />
          ))}
        </div>
      )}
    </div>
  );
};