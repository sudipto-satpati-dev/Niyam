import { MealType } from '../types/plan';

// ── Change these two lines to test different UI states ─────────────────────
export const DEV_ACTIVE_TAB: MealType = 'breakfast'; // 'breakfast' | 'morningSnack' | 'lunch' | 'eveningSnack' | 'dinner'
export const DEV_LOGGED_SCENARIO: 'none' | 'partial' | 'full' = 'partial';
// ──────────────────────────────────────────────────────────────────────────

// Scenario: none    → no meals logged today (morning state)
// Scenario: partial → breakfast + snack logged, lunch overdue
// Scenario: full    → all 5 meals logged (end of day)

export const mockLoggedMeals = {
  none: [],
  partial: [
    { mealKey: 'breakfast',    optionId: 'b1', optionName: 'Eggs + bread', kcal: 480, loggedAt: '2026-03-21T07:05:00Z' },
    { mealKey: 'morningSnack', optionId: 's1', optionName: 'Roasted chana', kcal: 120, loggedAt: '2026-03-21T10:38:00Z' },
  ],
  full: [
    { mealKey: 'breakfast',    optionId: 'b1', optionName: 'Eggs + bread',    kcal: 480, loggedAt: '2026-03-21T07:02:00Z' },
    { mealKey: 'morningSnack', optionId: 's1', optionName: 'Roasted chana',   kcal: 120, loggedAt: '2026-03-21T10:30:00Z' },
    { mealKey: 'lunch',        optionId: 'l2', optionName: 'Chicken + roti',  kcal: 600, loggedAt: '2026-03-21T13:15:00Z' },
    { mealKey: 'eveningSnack', optionId: 'es1',optionName: 'Roasted chana',   kcal: 120, loggedAt: '2026-03-21T16:30:00Z' },
    { mealKey: 'dinner',       optionId: 'd1', optionName: 'Roti + sabji',    kcal: 480, loggedAt: '2026-03-21T22:20:00Z' },
  ],
};

// Calorie totals per scenario
export const mockKcalTotals = {
  none:    0,
  partial: 600,
  full:    1800,
};

export const mockTargetKcal = 1810;
