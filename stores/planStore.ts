import { create } from 'zustand';
import { mockMealOptions } from '../Data/mockMealOptions';
import { mockTargetKcal } from '../Data/mockMealsState';
import { MealOption, MealType } from '../types/plan';

interface PlanState {
  plan: {
    meals: Record<string, MealOption[]>;
    calorieTargets: {
      total: number;
    };
    weight: {
      goalWeightKg: number;
      startWeightKg: number;
      milestones: import('../types/weight').WeightMilestone[];
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
