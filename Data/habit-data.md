# Mock Data — Habits / Reference Tab Flow

---

## mockHabitsData.ts

```ts
// src/data/mockHabitsData.ts

// ── Dev switch ────────────────────────────────────────────────────────────────
export type HabitsScenario = 'partial' | 'all_done' | 'new_user';
export const DEV_SCENARIO: HabitsScenario = 'partial';
// partial   → 3 of 5 acknowledged
// all_done  → all 5 done, success state
// new_user  → 0 acknowledged, onboarding banner
// ─────────────────────────────────────────────────────────────────────────────

// ── Non-negotiables (from plan.habits.nonNegotiables) ────────────────────────
export const mockNonNegotiables = [
  {
    id: 'nn1',
    title: 'Eat breakfast every weekday',
    reason: 'Skipping sets off fat-storage mode all day.',
  },
  {
    id: 'nn2',
    title: 'Eat lunch by 1:30 PM',
    reason: 'Even a small canteen meal beats nothing.',
  },
  {
    id: 'nn3',
    title: 'Sleep by 11 PM on weekdays',
    reason: 'Sleep is when fat-loss hormones work.',
  },
  {
    id: 'nn4',
    title: 'Do weekend workout both days',
    reason: '35 minutes — your only exercise window.',
  },
  {
    id: 'nn5',
    title: 'Drink morning water daily',
    reason: 'Takes 2 minutes, visibly reduces bloating.',
  },
];

// Acknowledged IDs per scenario
export const mockAcknowledged = {
  partial:   ['nn1', 'nn2', 'nn3'],
  all_done:  ['nn1', 'nn2', 'nn3', 'nn4', 'nn5'],
  new_user:  [],
};

// ── Morning drink recipe (from plan.habits.morningDrink) ─────────────────────
export const mockMorningDrink = {
  name: 'Ajwain-saunf water',
  tagline: 'Anti-bloat morning ritual',
  ingredients: [
    { name: 'Ajwain (carom seeds)', amount: '1 tsp' },
    { name: 'Saunf (fennel seeds)', amount: '1 tsp' },
    { name: 'Fresh ginger',          amount: 'Small piece, grated' },
    { name: 'Lime juice',            amount: '½ lime' },
    { name: 'Water (boiled, cooled)', amount: '300 ml' },
  ],
  steps: [
    'Boil 300ml water in the evening.',
    'Add ajwain + saunf. Soak overnight — minimum 8 hours.',
    'In the morning, strain the water into a glass.',
    'Add grated ginger and squeeze ½ lime. Drink 20–30 min before breakfast.',
  ],
  benefits: ['Reduces bloating', 'Aids digestion', 'Cuts water retention'],
  whyItWorks: [
    {
      ingredient: 'Ajwain',
      benefit: 'Contains thymol — relaxes gut muscles, relieves gas fast',
      color: '#E8F5EE',
    },
    {
      ingredient: 'Saunf',
      benefit: 'Mild diuretic — reduces water retention around the belly',
      color: '#E1F5EE',
    },
    {
      ingredient: 'Ginger',
      benefit: 'Speeds up gastric emptying — less bloat, better digestion',
      color: '#FAEEDA',
    },
  ],
};

export const mockDrinkStreak = 12; // consecutive days done

// ── Foods to avoid (from plan.habits.avoidList) ───────────────────────────────
export const mockAvoidList = [
  {
    item: 'Bread with jam daily',
    reason: 'Zero protein, pure sugar — crash by 10 AM',
    replace: 'Eggs + multigrain bread',
  },
  {
    item: 'Coffee on empty stomach',
    reason: 'Spikes cortisol, worsens hunger and anxiety',
    replace: 'Eat something first',
  },
  {
    item: 'Rice at night daily',
    reason: 'High glycemic, slows digestion before sleep',
    replace: 'Roti + sabji instead',
  },
  {
    item: 'Restaurant food >2x/week',
    reason: 'Hidden oils, portions 2× home serving size',
    replace: 'Canteen or home dabba',
  },
  {
    item: 'Sleeping after 12 AM',
    reason: 'Disrupts cortisol rhythm, increases belly fat',
    replace: 'Target 11 PM sleep',
  },
  {
    item: 'Milk tea after 9 PM',
    reason: 'Caffeine + sugar disrupts deep sleep quality',
    replace: 'Plain water after dinner',
  },
];

// ── Plan summary (from planStore — mocked here for standalone dev) ────────────
export const mockPlanSummary = {
  planName: "Rahul's 4-Month Plan",
  source: 'ai' as const,
  goalSummary: 'Lose 8 kg in 4 months at ~0.5 kg/week',
  stats: {
    kcalPerDay: 1810,
    mealsPerDay: 5,
    workoutDays: 'Weekend only',
  },
  weekdayRoutine: [
    { time: '06:45', label: 'Morning drink',  type: 'habit'    as const },
    { time: '07:00', label: 'Breakfast',      type: 'meal'     as const },
    { time: '10:30', label: 'Morning snack',  type: 'meal'     as const },
    { time: '13:00', label: 'Lunch',          type: 'meal'     as const },
    { time: '16:30', label: 'Evening snack',  type: 'meal'     as const },
    { time: '22:15', label: 'Dinner',         type: 'meal'     as const },
    { time: '22:30', label: 'Evening walk',   type: 'habit'    as const },
    { time: '23:00', label: 'Sleep',          type: 'habit'    as const },
  ],
  weekendRoutine: [
    { time: '07:30', label: 'Wake up',        type: 'habit'    as const },
    { time: '08:00', label: 'Morning drink',  type: 'habit'    as const },
    { time: '08:30', label: 'Breakfast',      type: 'meal'     as const },
    { time: '10:30', label: 'Workout',        type: 'exercise' as const },
    { time: '13:00', label: 'Lunch',          type: 'meal'     as const },
    { time: '16:30', label: 'Walk / outing',  type: 'habit'    as const },
    { time: '20:00', label: 'Dinner',         type: 'meal'     as const },
    { time: '23:00', label: 'Sleep',          type: 'habit'    as const },
  ],
  calorieTargets: {
    breakfast:    480,
    morningSnack: 130,
    lunch:        580,
    eveningSnack: 130,
    dinner:       490,
    total:        1810,
    deficit:      450,
  },
  weekendWorkout: [
    { name: 'Warm-up (jumping jacks)', sets: 1,  reps: '5 min'    },
    { name: 'Push-ups',                sets: 3,  reps: '12–15'    },
    { name: 'Bodyweight squats',       sets: 3,  reps: '20'       },
    { name: 'Plank hold',              sets: 3,  reps: '30–45 sec' },
    { name: 'Glute bridges',           sets: 3,  reps: '15'       },
    { name: 'Mountain climbers',       sets: 3,  reps: '30 sec'   },
    { name: 'Cool-down stretch',       sets: 1,  reps: '5 min'    },
  ],
  weeklyTimeline: [
    { week: '1–2',  phase: 'Adjustment',      expectedWeightKg: 74,   focus: 'Build breakfast habit. Stick to meal times.' },
    { week: '3–4',  phase: 'First changes',   expectedWeightKg: 73,   focus: 'Less bloating. More afternoon energy.' },
    { week: '5–8',  phase: 'Momentum',        expectedWeightKg: 71.5, focus: 'Clothes feel looser. Increase workout reps.' },
    { week: '9–12', phase: 'Visible results', expectedWeightKg: 69.5, focus: 'Clear waist definition. Energy stable all day.' },
    { week: '13–17',phase: 'Target range',    expectedWeightKg: 66,   focus: 'Maintain habits. Add jog on Sundays.' },
  ],
};
```
