# Mock Data — Meals Tab Flow

Drop into `src/data/mockMealsState.ts`.
Switch the `activeMealType` and `loggedScenario`
exports to test all card states without touching Firebase.

---

## mockMealsState.ts

```ts
// src/data/mockMealsState.ts

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
```

---

## mockMealOptions.ts (full plan meals data)

```ts
// src/data/mockMealOptions.ts
// Mirrors plan.meals shape exactly
// In real app this comes from planStore — never import this directly in prod

import { MealOption } from '../types/plan';

export const mockMealOptions: Record<string, MealOption[]> = {
  breakfast: [
    {
      id: 'b1',
      label: 'A',
      name: 'Eggs + bread',
      description: '3 whole eggs + 2 multigrain bread slices + 1 banana',
      items: ['3 whole eggs', '2 multigrain bread slices', '1 banana'],
      kcal: 480,
      prepMinutes: 10,
      tags: ['high-protein', 'easy'],
      isDefault: true,
      benefits: [
        'High protein keeps you full till lunch',
        'Complex carbs for steady energy all morning',
        'Banana adds potassium and natural sugar',
      ],
      bestFor: 'Weekdays when you\'re in a rush. Ready in under 10 minutes.',
    },
    {
      id: 'b2',
      label: 'B',
      name: 'Oats bowl',
      description: '1 cup rolled oats in milk + 1 tbsp peanut butter + 1 banana',
      items: ['1 cup rolled oats', '1 cup milk', '1 tbsp peanut butter', '1 banana'],
      kcal: 460,
      prepMinutes: 8,
      tags: ['filling', 'easy'],
      benefits: [
        'Oats are high in soluble fibre — reduces cholesterol',
        'Peanut butter adds healthy fats and protein',
        'Keeps you full longer than bread',
      ],
      bestFor: 'When you have 8 minutes. Can be made the night before.',
    },
    {
      id: 'b3',
      label: 'C',
      name: 'Poha + eggs',
      description: '2 cups poha with peanuts and veggies + 2 boiled eggs on the side',
      items: ['2 cups poha', '2 boiled eggs', 'peanuts', 'vegetables', 'mustard seeds', 'curry leaves'],
      kcal: 450,
      prepMinutes: 15,
      tags: ['indian', 'filling'],
      benefits: [
        'Poha is light and easy to digest',
        'Iron-rich when made with curry leaves',
        'Peanuts add protein and crunch',
      ],
      bestFor: 'Weekends or when you have 15 minutes. Familiar taste.',
    },
    {
      id: 'b4',
      label: 'D',
      name: 'Tawa paratha',
      description: '2 aloo/gobhi parathas (tawa only, no butter) + 1 cup dahi',
      items: ['2 parathas (aloo or gobhi)', '1 cup dahi', 'pickle (small)'],
      kcal: 480,
      prepMinutes: 20,
      tags: ['indian', 'weekend-preferred'],
      benefits: [
        'Satisfying and filling — good for heavier mornings',
        'Dahi adds probiotics for gut health',
        'No butter keeps calories in check',
      ],
      bestFor: 'Weekends when you have time to cook. Not ideal for rushed weekdays.',
    },
    {
      id: 'b5',
      label: 'E',
      name: 'Dalia + eggs',
      description: '1.5 cups cooked dalia with milk or veggies + 2 boiled eggs',
      items: ['1.5 cups dalia (broken wheat)', 'milk or vegetables', '2 boiled eggs'],
      kcal: 430,
      prepMinutes: 15,
      tags: ['high-fiber', 'indian'],
      benefits: [
        'Dalia is a slow-digesting grain — great for blood sugar',
        'High fibre aids digestion and reduces bloating',
        'Lowest calorie option — good if you had a heavy dinner',
      ],
      bestFor: 'Days after a heavy dinner. Gives your gut a break.',
    },
  ],

  morningSnack: [
    {
      id: 's1', label: 'A', name: 'Roasted chana',
      description: '100–120g pack. Easy to carry in bag.',
      items: ['100g roasted chana'],
      kcal: 120, prepMinutes: 0, tags: ['carry-friendly'],
      isDefault: true,
      benefits: ['High protein for a snack', 'Slow-digesting — no sugar spike', 'Cheap and widely available'],
      bestFor: 'Every weekday. Keep a pack in your bag at all times.',
    },
    {
      id: 's2', label: 'B', name: 'Banana',
      description: '1 medium banana. Quick and natural.',
      items: ['1 medium banana'],
      kcal: 90, prepMinutes: 0, tags: ['carry-friendly', 'quick'],
      benefits: ['Fast energy', 'High potassium', 'Natural sugar — no crash'],
      bestFor: 'When you only have 10 seconds. Best pre-snack between classes.',
    },
    {
      id: 's3', label: 'C', name: 'Mixed nuts',
      description: 'Small handful (25g) — almonds, cashews, walnuts.',
      items: ['25g mixed nuts (almonds, cashews, walnuts)'],
      kcal: 150, prepMinutes: 0, tags: ['carry-friendly'],
      benefits: ['Healthy fats support brain function', 'No sugar — stable energy', 'Portable, no prep'],
      bestFor: 'Office afternoons. Keep a small box in your drawer.',
    },
    {
      id: 's4', label: 'D', name: 'Boiled egg',
      description: '1 boiled egg. Prep the night before.',
      items: ['1 boiled egg'],
      kcal: 70, prepMinutes: 0, tags: ['high-protein'],
      benefits: ['Highest protein-to-calorie ratio of any snack', 'Zero sugar', 'Very filling'],
      bestFor: 'When you boil eggs the night before. Plan ahead.',
    },
    {
      id: 's5', label: 'E', name: 'Seasonal fruit',
      description: '1 apple, guava, or pear.',
      items: ['1 apple or guava or pear'],
      kcal: 80, prepMinutes: 0, tags: ['carry-friendly', 'hydrating'],
      benefits: ['High fibre and water content', 'Seasonal variety is good', 'Natural sugar with fibre slows digestion'],
      bestFor: 'When you want something light and fresh. Works any season.',
    },
  ],

  lunch: [
    {
      id: 'l1', label: 'A', name: 'Dal + roti',
      description: '2 rotis + 1 bowl dal + 1 cup sabji + 1 cup dahi',
      items: ['2 rotis', '1 bowl dal (any)', '1 cup sabji', '1 cup dahi'],
      kcal: 580, prepMinutes: 0, tags: ['ideal', 'balanced'],
      isDefault: true,
      benefits: ['Balanced protein, carb, and fat ratio', 'Dahi adds probiotics', 'Classic combination — easy to find anywhere'],
      bestFor: 'Every weekday. Order from canteen or dabba service.',
    },
    {
      id: 'l2', label: 'B', name: 'Chicken + roti',
      description: '2 rotis + 150g chicken curry + 1 cup sabji',
      items: ['2 rotis', '150g chicken curry', '1 cup sabji'],
      kcal: 600, prepMinutes: 0, tags: ['high-protein'],
      benefits: ['Highest protein option at lunch', 'Keeps you full through the afternoon', 'Good for muscle maintenance'],
      bestFor: 'Days when you skipped morning snack or had a light breakfast.',
    },
    {
      id: 'l3', label: 'C', name: 'Rajma / Chole',
      description: '1.5 cups rajma or chole + 2 rotis + small salad',
      items: ['1.5 cups rajma or chole', '2 rotis', 'onion-tomato-cucumber salad'],
      kcal: 570, prepMinutes: 0, tags: ['vegetarian', 'high-protein'],
      benefits: ['Plant-based protein — good variety', 'High fibre aids afternoon digestion', 'Filling without feeling heavy'],
      bestFor: 'Good change from dal. Rich and satisfying.',
    },
    {
      id: 'l4', label: 'D', name: 'Rice meal',
      description: '1 cup rice + dal + egg or fish curry + sabji. Once a week.',
      items: ['1 cup rice', 'dal', 'egg curry or fish curry', 'sabji'],
      kcal: 580, prepMinutes: 0, tags: ['once-a-week'],
      benefits: ['Rice provides quick energy', 'Good for variety', 'Comfortable and familiar'],
      bestFor: 'Once a week maximum. Not on days when you feel heavy or bloated.',
    },
    {
      id: 'l5', label: 'E', name: 'Canteen dabba',
      description: 'Dal-roti or grilled chicken from office canteen or dabba service.',
      items: ['dal-roti or sabji-roti or grilled chicken'],
      kcal: 550, prepMinutes: 0, tags: ['outside', 'flexible'],
      benefits: ['Convenient for busy days', 'Avoid fried items', 'Look for dal/roti/grilled options'],
      bestFor: 'Any weekday. Avoid fried and creamy options. Ask for less oil.',
    },
  ],

  eveningSnack: [
    {
      id: 'es1', label: 'A', name: 'Roasted chana + coffee',
      description: 'Small pack of chana, then black coffee.',
      items: ['80g roasted chana', '1 cup black coffee'],
      kcal: 120, prepMinutes: 0, tags: ['carry-friendly'],
      isDefault: true,
      benefits: ['Protein before coffee reduces cortisol spike', 'Chana keeps you going till 9 PM', 'Coffee at this time is fine'],
      bestFor: 'Every weekday at 4:30 PM. Never coffee on an empty stomach.',
    },
    {
      id: 'es2', label: 'B', name: 'Mixed nuts + coffee',
      description: 'Handful of nuts (25g), then black coffee.',
      items: ['25g mixed nuts', '1 cup black coffee'],
      kcal: 150, prepMinutes: 0, tags: [],
      benefits: ['Healthy fats stabilise blood sugar', 'Good brain food for the final office hours', 'Satisfying without being heavy'],
      bestFor: 'When you have nuts in your drawer. Office-friendly.',
    },
    {
      id: 'es3', label: 'C', name: 'Banana + coffee',
      description: '1 banana, then black coffee.',
      items: ['1 banana', '1 cup black coffee'],
      kcal: 90, prepMinutes: 0, tags: ['quick'],
      benefits: ['Quick energy boost', 'Natural sugar with fibre', 'Easy to grab anywhere'],
      bestFor: 'When you skipped the morning snack and need quick energy.',
    },
  ],

  dinner: [
    {
      id: 'd1', label: 'A', name: 'Roti + sabji',
      description: '2 rotis + any vegetable sabji + 1 bowl dal. Lighter than lunch.',
      items: ['2 rotis', 'vegetable sabji (any)', '1 bowl dal'],
      kcal: 480, prepMinutes: 0, tags: ['ideal', 'light'],
      isDefault: true,
      benefits: ['Light enough to digest before sleeping', 'No rice keeps blood sugar stable overnight', 'Classic — available everywhere'],
      bestFor: 'Every weeknight. The standard dinner.',
    },
    {
      id: 'd2', label: 'B', name: 'Chicken / egg',
      description: '2 rotis + 100g grilled chicken or 2-egg bhurji + sabji',
      items: ['2 rotis', '100g chicken or 2-egg bhurji', '1 cup sabji'],
      kcal: 500, prepMinutes: 0, tags: ['high-protein'],
      benefits: ['Protein at night supports muscle recovery', 'Good if you exercised today', 'Satisfying without being heavy'],
      bestFor: 'Post-weekend workout days. Or when you need more protein.',
    },
    {
      id: 'd3', label: 'C', name: 'Dal khichdi',
      description: '1.5 cups khichdi (dal + rice) + dahi + papad',
      items: ['1.5 cups khichdi', 'dahi', 'papad'],
      kcal: 460, prepMinutes: 0, tags: ['easy', 'light'],
      benefits: ['Easiest to digest — good for late nights', 'Complete protein (dal + rice combination)', 'Dahi adds probiotics'],
      bestFor: 'When you reach home past 10:30 PM and feel tired.',
    },
    {
      id: 'd4', label: 'D', name: 'Paneer sabji',
      description: '2 rotis + small portion paneer sabji + salad. No rice.',
      items: ['2 rotis', 'paneer sabji (small portion)', 'salad'],
      kcal: 490, prepMinutes: 0, tags: ['vegetarian'],
      benefits: ['Paneer provides complete protein', 'Good vegetarian variety', 'Salad adds fibre and volume'],
      bestFor: 'When you want something more satisfying than plain sabji.',
    },
    {
      id: 'd5', label: 'E', name: 'Avoid tonight',
      description: 'Restaurant biryani, fried rice, noodles — save for weekends.',
      items: [],
      kcal: 700, prepMinutes: 0,
      tags: ['cheat'],
      isCheat: true,
      benefits: [],
      bestFor: 'Weekends only. Not at night on weekdays.',
    },
  ],
};
```

---

## mockWeeklyMeals.ts

```ts
// src/data/mockWeeklyMeals.ts

export const mockWeeklyMeals = [
  {
    date: '2026-03-16', day: 'Mon',
    dayScore: 88,
    logged: { breakfast: true, morningSnack: true, lunch: true, eveningSnack: true, dinner: true },
    totalKcal: 1790,
  },
  {
    date: '2026-03-17', day: 'Tue',
    dayScore: 72,
    logged: { breakfast: true, morningSnack: false, lunch: true, eveningSnack: false, dinner: true },
    totalKcal: 1560,
  },
  {
    date: '2026-03-18', day: 'Wed',
    dayScore: 92,
    logged: { breakfast: true, morningSnack: true, lunch: true, eveningSnack: true, dinner: true },
    totalKcal: 1810,
  },
  {
    date: '2026-03-19', day: 'Thu',
    dayScore: 75,
    logged: { breakfast: true, morningSnack: true, lunch: true, eveningSnack: false, dinner: true },
    totalKcal: 1680,
  },
  {
    date: '2026-03-20', day: 'Fri',
    dayScore: 85,
    logged: { breakfast: true, morningSnack: true, lunch: true, eveningSnack: true, dinner: false },
    totalKcal: 1330,
  },
  {
    date: '2026-03-21', day: 'Sat',  // today
    dayScore: 0,
    logged: { breakfast: true, morningSnack: true, lunch: false, eveningSnack: false, dinner: false },
    totalKcal: 600,
  },
  {
    date: '2026-03-22', day: 'Sun',  // future
    dayScore: null,
    logged: { breakfast: false, morningSnack: false, lunch: false, eveningSnack: false, dinner: false },
    totalKcal: 0,
  },
];

// Derived summary
export const mockWeekSummary = {
  daysTracked: 5,
  avgKcalPerDay: Math.round([1790, 1560, 1810, 1680, 1330].reduce((a,b) => a+b) / 5),
  bestDay: { day: 'Wed', score: 92 },
  worstDay: { day: 'Tue', score: 72 },
};
```

---

## TypeScript additions for this flow

```ts
// Add to src/types/plan.ts

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
  bestFor: string;        // shown in detail sheet
}

export type MealType =
  | 'breakfast'
  | 'morningSnack'
  | 'lunch'
  | 'eveningSnack'
  | 'dinner';
```