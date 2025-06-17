import { Habit } from '../types/habit';

export const dummyHabits: Habit[] = [
  {
    id: '1',
    name: 'Drink Water',
    description: 'Stay hydrated throughout the day',
    category: 'health',
    goal: 8,
    unit: 'glasses',
    streak: 15,
    completedToday: false,
    todayProgress: 5,
    weeklyCompletion: [true, true, false, true, true, true, false],
    createdAt: '2024-01-01',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Morning Exercise',
    description: '30 minutes of physical activity',
    category: 'fitness',
    goal: 30,
    unit: 'minutes',
    streak: 7,
    completedToday: true,
    todayProgress: 30,
    weeklyCompletion: [true, true, true, false, true, true, true],
    createdAt: '2024-01-02',
    color: '#EF4444'
  },
  {
    id: '3',
    name: 'Read Books',
    description: 'Daily reading for personal growth',
    category: 'learning',
    goal: 30,
    unit: 'pages',
    streak: 12,
    completedToday: false,
    todayProgress: 15,
    weeklyCompletion: [true, false, true, true, true, false, true],
    createdAt: '2024-01-03',
    color: '#10B981'
  },
  {
    id: '4',
    name: 'Meditation',
    description: 'Mindfulness and mental clarity',
    category: 'mindfulness',
    goal: 15,
    unit: 'minutes',
    streak: 5,
    completedToday: true,
    todayProgress: 15,
    weeklyCompletion: [false, true, true, true, false, true, true],
    createdAt: '2024-01-04',
    color: '#8B5CF6'
  },
  {
    id: '5',
    name: 'Write Code',
    description: 'Practice programming skills',
    category: 'productivity',
    goal: 2,
    unit: 'hours',
    streak: 23,
    completedToday: false,
    todayProgress: 1,
    weeklyCompletion: [true, true, true, true, false, true, false],
    createdAt: '2024-01-05',
    color: '#F59E0B'
  },
  {
    id: '6',
    name: 'Call Family',
    description: 'Stay connected with loved ones',
    category: 'social',
    goal: 1,
    unit: 'call',
    streak: 3,
    completedToday: false,
    todayProgress: 0,
    weeklyCompletion: [true, false, false, true, true, false, false],
    createdAt: '2024-01-06',
    color: '#EC4899'
  }
];