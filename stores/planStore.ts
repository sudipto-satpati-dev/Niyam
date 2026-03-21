import { create } from 'zustand';
import { mockMealOptions } from '../Data/mockMealOptions';
import { mockTargetKcal } from '../Data/mockMealsState';
import { MealOption, MealType } from '../types/plan';

interface PlanState {
  plan: {
    meals: Record<string, MealOption[]>;
    calorieTargets: {
      total: number;
    }
  };
  getDefaultOption: (mealKey: MealType) => MealOption;
  getMealOptions: (mealKey: MealType) => MealOption[];
}

export const usePlanStore = create<PlanState>((set, get) => ({
  plan: {
    meals: mockMealOptions,
    calorieTargets: {
      total: mockTargetKcal,
    }
  },
  getDefaultOption: (mealKey: MealType): MealOption => {
    const options = get().plan.meals[mealKey];
    return options?.find(o => o.isDefault) ?? options[0];
  },
  getMealOptions: (mealKey: MealType): MealOption[] => {
    return get().plan?.meals[mealKey] ?? [];
  },
}));
