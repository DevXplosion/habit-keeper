import React from 'react';
import { Calendar, BarChart3, Plus } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'analytics';
  onViewChange: (view: 'dashboard' | 'analytics') => void;
  onAddHabit: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onAddHabit }) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Habit Keeper</h1>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-gray-500">{today}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentView === 'dashboard'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4 inline-block mr-1" />
                Today
              </button>
              <button
                onClick={() => onViewChange('analytics')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentView === 'analytics'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-1" />
                Analytics
              </button>
            </nav>

            <button
              onClick={onAddHabit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};