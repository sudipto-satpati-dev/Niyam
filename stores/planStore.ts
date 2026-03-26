import { create } from 'zustand';
import { mockMealOptions } from '../Data/mockMealOptions';
import { mockTargetKcal } from '../Data/mockMealsState';
import { 
  mockNonNegotiables, 
  mockMorningDrink, 
  mockAvoidList, 
  mockWeekdayRoutine, 
  mockWeekendRoutine, 
  mockWeeklyTimeline 
} from '../Data/mockHabitsData';
import { MealOption, MealType, Plan } from '../types/plan';

interface PlanState {
  plan: Plan;
  source: 'ai' | 'default';
  getDefaultOption: (mealKey: MealType) => MealOption;
  getMealOptions: (mealKey: MealType) => MealOption[];
}

export const usePlanStore = create<PlanState>((set, get) => ({
  source: 'ai',
  plan: {
    meals: mockMealOptions,
    calorieTargets: {
      total: mockTargetKcal,
      breakfast: 480,
      morningSnack: 130,
      lunch: 580,
      eveningSnack: 130,
      dinner: 490,
      deficit: 450,
    },
    weight: {
      goalWeightKg: 66.0,
      startWeightKg: 74.0,
      milestones: [
        { weightKg: 72, label: 'First 2 kg!',   weeksEstimate: 3,  reached: true,  isCurrent: true  },
        { weightKg: 70, label: 'Under 70 kg',   weeksEstimate: 7,  reached: false, isCurrent: false },
        { weightKg: 68, label: 'Halfway',        weeksEstimate: 11, reached: false, isCurrent: false },
        { weightKg: 66, label: 'Almost there',  weeksEstimate: 15, reached: false, isCurrent: false },
        { weightKg: 65, label: 'Goal!',         weeksEstimate: 17, reached: false, isCurrent: false },
      ],
    },
    habits: {
      nonNegotiables: mockNonNegotiables,
      morningDrink: mockMorningDrink,
      avoidList: mockAvoidList,
    },
    weekdayRoutine: mockWeekdayRoutine,
    weekendRoutine: mockWeekendRoutine,
    weeklyTimeline: mockWeeklyTimeline,
    goalSummary: 'Lose 8 kg in 4 months at ~0.5 kg/week',
    stats: {
      kcalPerDay: 1810,
      mealsPerDay: 5,
      workoutDays: 'Weekend only',
    },
  },
  getDefaultOption: (mealKey: MealType): MealOption => {
    const options = get().plan.meals[mealKey];
    return options?.find(o => o.isDefault) ?? options[0];
  },
  getMealOptions: (mealKey: MealType): MealOption[] => {
    return get().plan?.meals[mealKey] ?? [];
  },
}));
