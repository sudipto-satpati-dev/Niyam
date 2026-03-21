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
