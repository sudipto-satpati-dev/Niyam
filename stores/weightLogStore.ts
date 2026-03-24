import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeightEntry } from '../types/weight';
import { parseISO, format, differenceInWeeks } from 'date-fns';

interface WeightLogStore {
  entries: WeightEntry[];
  completedMilestoneWeights: number[];

  logWeight: (entry: WeightEntry) => void;
  updateEntry: (date: string, weightKg: number) => void;
  getCurrentWeight: () => number | null;
  getWeeklyRate: () => number;
  hasLoggedThisWeek: () => boolean;
  addCompletedMilestone: (kg: number) => void;
}

export const useWeightLogStore = create<WeightLogStore>()(
  persist(
    (set, get) => ({
      entries: [],
      completedMilestoneWeights: [],

      logWeight: (entry: WeightEntry) => {
        const { entries } = get();
        // Check if user already logged this week (ISO week)
        const newDate = parseISO(entry.date);
        const newWeek = format(newDate, 'I');
        const newYear = format(newDate, 'RRRR');

        const existingIndex = entries.findIndex(e => {
          const d = parseISO(e.date);
          return format(d, 'I') === newWeek && format(d, 'RRRR') === newYear;
        });

        if (existingIndex !== -1) {
          const updatedEntries = [...entries];
          updatedEntries[existingIndex] = entry;
          set({ entries: updatedEntries });
        } else {
          set({ entries: [...entries, entry].sort((a,b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()) });
        }
      },

      updateEntry: (date: string, weightKg: number) => {
        set((state) => ({
          entries: state.entries.map(e => e.date === date ? { ...e, weightKg } : e)
        }));
      },

      getCurrentWeight: () => {
        const { entries } = get();
        if (entries.length === 0) return null;
        return entries[entries.length - 1].weightKg;
      },

      getWeeklyRate: () => {
        const { entries } = get();
        if (entries.length < 2) return 0;
        const first = entries[0];
        const last = entries[entries.length - 1];
        const weeks = differenceInWeeks(parseISO(last.date), parseISO(first.date));
        if (weeks === 0) return 0;
        return parseFloat(((first.weightKg - last.weightKg) / weeks).toFixed(2));
      },

      hasLoggedThisWeek: () => {
        const { entries } = get();
        if (entries.length === 0) return false;
        const now = new Date();
        const thisWeek = format(now, 'I');
        const thisYear = format(now, 'RRRR');
        
        return entries.some(e => {
          const d = parseISO(e.date);
          return format(d, 'I') === thisWeek && format(d, 'RRRR') === thisYear;
        });
      },

      addCompletedMilestone: (kg: number) => {
        set((state) => ({
          completedMilestoneWeights: [...state.completedMilestoneWeights, kg]
        }));
      },
    }),
    {
      name: 'niyam-weight-log',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
