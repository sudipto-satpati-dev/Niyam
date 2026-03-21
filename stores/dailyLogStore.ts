import { create } from 'zustand';
import { DailyLog, MealLogEntry, HabitLogEntry } from '../types/log';
import { mockDailyLog } from '../Data/mockDailyLog';
import { mockHomeState } from '../Data/mockHomeState';
import { DEV_LOGGED_SCENARIO, mockLoggedMeals, mockKcalTotals } from '../Data/mockMealsState';

interface DailyLogStore {
  today: DailyLog;
  history: DailyLog[];
  streak: number;

  logMeal: (log: MealLogEntry) => void;
  editMeal: (mealKey: string, update: Partial<MealLogEntry>) => void;
  getLoggedMeal: (mealKey: string) => MealLogEntry | undefined;
  getTodayKcal: () => number;

  logHabit: (log: HabitLogEntry) => void;
  undoLog: (timeKey: string) => void;
  calculateDayScore: () => number;
  archiveDay: () => void;

  // For dev testing states
  setTodayLog: (log: DailyLog) => void;
}

export const useDailyLogStore = create<DailyLogStore>((set, get) => {
  const initialMeals = mockLoggedMeals[DEV_LOGGED_SCENARIO];
  const initialKcal = mockKcalTotals[DEV_LOGGED_SCENARIO];

  return {
    today: {
      ...mockDailyLog,
      meals: initialMeals,
      totalKcal: initialKcal,
    },
    history: [],
    streak: mockHomeState.streak,

    logMeal: (log) => {
      set(state => ({
        today: {
          ...state.today,
          meals: [...state.today.meals, log],
          totalKcal: state.today.totalKcal + log.kcal,
        }
      }));
    },

    editMeal: (mealKey, update) => {
      set(state => {
        const existingMeal = state.today.meals.find(m => m.mealKey === mealKey);
        const oldKcal = existingMeal ? existingMeal.kcal : 0;
        const newKcal = update.kcal ?? oldKcal;
        
        return {
          today: {
            ...state.today,
            meals: state.today.meals.map(m =>
              m.mealKey === mealKey ? { ...m, ...update } : m
            ),
            totalKcal: state.today.totalKcal - oldKcal + newKcal,
          }
        };
      });
    },

    getLoggedMeal: (mealKey: string): MealLogEntry | undefined => {
      return get().today.meals.find(m => m.mealKey === mealKey);
    },

    getTodayKcal: () => {
      return get().today.totalKcal;
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
  }
});
