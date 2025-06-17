import React from 'react';
import { CheckCircle2, Circle, Flame, Edit, Trash2 } from 'lucide-react';
import { Habit } from '../types/habit';

interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (id: string) => void;
  onUpdateProgress: (id: string, progress: number) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleComplete,
  onUpdateProgress,
  onEdit,
  onDelete
}) => {
  const progressPercentage = (habit.todayProgress / habit.goal) * 100;
  const isComplete = habit.todayProgress >= habit.goal;

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

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${
      isComplete 
        ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white ring-2 ring-emerald-100' 
        : 'border-gray-100 hover:border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`text-3xl transform transition-transform duration-200 ${
            isComplete ? 'scale-110' : 'group-hover:scale-105'
          }`}>
            {getCategoryIcon(habit.category)}
          </div>
          <div>
            <h3 className={`font-bold text-lg transition-colors duration-200 ${
              isComplete ? 'text-emerald-800' : 'text-gray-900'
            }`}>
              {habit.name}
            </h3>
            {habit.description && (
              <p className={`text-sm mt-1 transition-colors duration-200 ${
                isComplete ? 'text-emerald-600' : 'text-gray-500'
              }`}>
                {habit.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(habit)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-medium transition-colors duration-200 ${
            isComplete ? 'text-emerald-700' : 'text-gray-600'
          }`}>
            {habit.todayProgress} / {habit.goal} {habit.unit}
          </span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-200 ${
            habit.streak > 0 
              ? 'bg-orange-100 text-orange-700' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <Flame className={`w-4 h-4 ${habit.streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className="text-sm font-bold">{habit.streak}</span>
          </div>
        </div>

        <div className={`w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden ${
          isComplete ? 'ring-2 ring-emerald-200' : ''
        }`}>
          <div
            className={`h-3 rounded-full transition-all duration-500 ease-out relative ${
              isComplete ? 'shadow-lg' : ''
            }`}
            style={{
              width: `${Math.min(progressPercentage, 100)}%`,
              backgroundColor: habit.color
            }}
          >
            {isComplete && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min="0"
            max={habit.goal}
            value={habit.todayProgress}
            onChange={(e) => onUpdateProgress(habit.id, Number(e.target.value))}
            className="flex-1 mr-4 h-2 rounded-lg appearance-none cursor-pointer"
            style={{ 
              accentColor: habit.color,
              background: `linear-gradient(to right, ${habit.color} 0%, ${habit.color} ${progressPercentage}%, #e5e7eb ${progressPercentage}%, #e5e7eb 100%)`
            }}
          />
          
          <button
            onClick={() => onToggleComplete(habit.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
              isComplete
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span>{isComplete ? 'Completed!' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {habit.weeklyCompletion.map((completed, index) => (
            <div
              key={index}
              className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold transition-all duration-200 ${
                completed
                  ? 'bg-emerald-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
            </div>
          ))}
        </div>
        
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
          isComplete 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {progressPercentage.toFixed(0)}% complete
        </div>
      </div>
    </div>
  );
};