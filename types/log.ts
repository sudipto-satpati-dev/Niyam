export interface MealLogEntry {
  mealKey: string;
  optionId: string;
  optionName: string;
  kcal: number;
  loggedAt: string; // ISO string
}

export interface HabitLogEntry {
  habitKey: string;
  status: 'done' | 'skipped' | 'upcoming';
  loggedAt: string;
}

export interface DailyLog {
  date: string;             // 'YYYY-MM-DD'
  meals: MealLogEntry[];
  habits: HabitLogEntry[];
  completedItems: string[]; // time strings e.g. ['07:00', '10:30']
  totalKcal: number;
  dayScore: number;         // 0–100
  note?: string;
}

export type ItemStatus = 'done' | 'overdue' | 'upcoming' | 'missed';

export interface TimelineItem {
  time: string;           // 'HH:MM'
  label: string;
  type: 'meal' | 'habit' | 'exercise';
  mealKey?: string;
  habitKey?: string;
  description: string;
}
