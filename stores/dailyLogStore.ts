import { create } from 'zustand';
import { DailyLog, MealLogEntry, HabitLogEntry } from '../types/log';
import { mockDailyLog } from '../Data/mockDailyLog';
import { mockHomeState } from '../Data/mockHomeState';

interface DailyLogStore {
  today: DailyLog;
  history: DailyLog[];
  streak: number;

  logMeal: (log: MealLogEntry) => void;
  logHabit: (log: HabitLogEntry) => void;
  undoLog: (timeKey: string) => void;
  calculateDayScore: () => number;
  archiveDay: () => void;

  // For dev testing states
  setTodayLog: (log: DailyLog) => void;
}

export const useDailyLogStore = create<DailyLogStore>((set, get) => ({
  today: mockDailyLog,
  history: [],
  streak: mockHomeState.streak,

  logMeal: (log) => {
    console.log('Mock logged meal:', log);
  },
  
  logHabit: (log) => {
    console.log('Mock logged habit:', log);
  },
  
  undoLog: (timeKey) => {
    console.log('Mock undo log:', timeKey);
  },
  
  calculateDayScore: () => 0,
  archiveDay: () => {},
  
  setTodayLog: (log) => set({ today: log }),
}));
