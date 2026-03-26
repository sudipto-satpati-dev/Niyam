export interface NonNegotiable {
  id: string;
  title: string;
  reason: string;
}

export interface MorningDrinkIngredient {
  name: string;
  amount: string;
}

export interface WhyItWorks {
  ingredient: string;
  benefit: string;
  color: string;
}

export interface MorningDrink {
  name: string;
  tagline: string;
  ingredients: MorningDrinkIngredient[];
  steps: string[];
  benefits: string[];
  whyItWorks: WhyItWorks[];
}

export interface AvoidItem {
  item: string;
  reason: string;
  replace: string;
}

export interface RoutineItem {
  time: string;
  label: string;
  type: 'meal' | 'habit' | 'exercise';
}

export interface WeeklyTimeline {
  week: string;
  phase: string;
  expectedWeightKg: number;
  focus: string;
}

export interface MealOption {
  id: string;
  label: string;          // 'A' | 'B' | 'C' | 'D' | 'E'
  name: string;
  description: string;
  items: string[];
  kcal: number;
  prepMinutes: number;
  tags: string[];
  isDefault?: boolean;
  isCheat?: boolean;      // E option on dinner — special amber styling
  benefits: string[];     // shown in detail sheet
  howToPrepare?: string[]; // step-by-step instructions
  bestFor: string;        // shown in detail sheet
}

export type MealType =
  | 'breakfast'
  | 'morningSnack'
  | 'lunch'
  | 'eveningSnack'
  | 'dinner';

export interface Plan {
  meals: Record<string, MealOption[]>;
  calorieTargets: {
    total: number;
    breakfast: number;
    morningSnack: number;
    lunch: number;
    eveningSnack: number;
    dinner: number;
    deficit: number;
  };
  weight: {
    goalWeightKg: number;
    startWeightKg: number;
    milestones: import('./weight').WeightMilestone[];
  };
  habits: {
    nonNegotiables: NonNegotiable[];
    morningDrink: MorningDrink;
    avoidList: AvoidItem[];
  };
  weekdayRoutine: RoutineItem[];
  weekendRoutine: RoutineItem[];
  weeklyTimeline: WeeklyTimeline[];
  goalSummary: string;
  stats: {
    kcalPerDay: number;
    mealsPerDay: number;
    workoutDays: string;
  };
}
