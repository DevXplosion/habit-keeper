export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: 'health' | 'productivity' | 'learning' | 'fitness' | 'mindfulness' | 'social';
  goal: number;
  unit: string;
  streak: number;
  completedToday: boolean;
  todayProgress: number;
  weeklyCompletion: boolean[];
  createdAt: string;
  color: string;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  weeklyCompletion: number;
}