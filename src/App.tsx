import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { HabitModal } from './components/HabitModal';
import { Habit, HabitStats } from './types/habit';
import { dummyHabits } from './data/dummyData';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics'>('dashboard');
  const [habits, setHabits] = useState<Habit[]>(dummyHabits);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const calculateStats = (): HabitStats => {
    const totalHabits = habits.length;
    const completedToday = habits.filter(habit => habit.todayProgress >= habit.goal).length;
    const longestStreak = Math.max(...habits.map(habit => habit.streak), 0);
    const weeklyCompletion = habits.length > 0 
      ? Math.round((habits.reduce((acc, habit) => 
          acc + (habit.weeklyCompletion.filter(Boolean).length / 7), 0
        ) / habits.length) * 100)
      : 0;

    return {
      totalHabits,
      completedToday,
      longestStreak,
      weeklyCompletion
    };
  };

  const handleToggleComplete = (id: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === id) {
          const newProgress = habit.todayProgress >= habit.goal ? 0 : habit.goal;
          const wasComplete = habit.todayProgress >= habit.goal;
          
          return {
            ...habit,
            todayProgress: newProgress,
            completedToday: newProgress >= habit.goal,
            streak: !wasComplete && newProgress >= habit.goal ? habit.streak + 1 : habit.streak
          };
        }
        return habit;
      })
    );
  };

  const handleUpdateProgress = (id: string, progress: number) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === id) {
          const wasComplete = habit.todayProgress >= habit.goal;
          const isNowComplete = progress >= habit.goal;
          
          return {
            ...habit,
            todayProgress: progress,
            completedToday: isNowComplete,
            streak: !wasComplete && isNowComplete ? habit.streak + 1 : habit.streak
          };
        }
        return habit;
      })
    );
  };

  const handleSaveHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'todayProgress' | 'weeklyCompletion' | 'createdAt'>) => {
    if (editingHabit) {
      setHabits(prevHabits =>
        prevHabits.map(habit =>
          habit.id === editingHabit.id
            ? { ...habit, ...habitData }
            : habit
        )
      );
    } else {
      const newHabit: Habit = {
        ...habitData,
        id: Date.now().toString(),
        streak: 0,
        completedToday: false,
        todayProgress: 0,
        weeklyCompletion: [false, false, false, false, false, false, false],
        createdAt: new Date().toISOString()
      };
      setHabits(prevHabits => [...prevHabits, newHabit]);
    }
    setEditingHabit(undefined);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleDeleteHabit = (id: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    }
  };

  const handleAddHabit = () => {
    setEditingHabit(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHabit(undefined);
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddHabit={handleAddHabit}
      />

      {currentView === 'dashboard' ? (
        <Dashboard
          habits={habits}
          stats={stats}
          onToggleComplete={handleToggleComplete}
          onUpdateProgress={handleUpdateProgress}
          onEditHabit={handleEditHabit}
          onDeleteHabit={handleDeleteHabit}
        />
      ) : (
        <Analytics habits={habits} />
      )}

      <HabitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveHabit}
        habit={editingHabit}
      />
    </div>
  );
}

export default App;