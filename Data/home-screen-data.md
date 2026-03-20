# Mock Data — Home / Today Dashboard Flow

Drop these into `src/data/`. The stores load these during
UI development. Replace with Firebase reads in Phase 3.

---

## mockDailyLog.ts

```ts
// src/data/mockDailyLog.ts
// Simulates a mid-day state — some things done, lunch overdue

import { DailyLog } from '../types/log';

export const mockDailyLog: DailyLog = {
  date: '2026-03-21',
  meals: [
    {
      mealKey: 'breakfast',
      optionId: 'b1',
      optionName: 'Eggs + bread + banana',
      kcal: 480,
      loggedAt: '2026-03-21T07:05:00Z',
    },
    {
      mealKey: 'morningSnack',
      optionId: 's1',
      optionName: 'Roasted chana',
      kcal: 120,
      loggedAt: '2026-03-21T10:38:00Z',
    },
  ],
  habits: [
    {
      habitKey: 'morningDrink',
      status: 'done',
      loggedAt: '2026-03-21T06:47:00Z',
    },
  ],
  completedItems: ['06:45', '07:00', '10:30'],
  totalKcal: 600,
  dayScore: 0,
};

// Three scenario variants for UI testing:

export const mockDailyLogMorning: DailyLog = {
  date: '2026-03-21',
  meals: [],
  habits: [],
  completedItems: [],
  totalKcal: 0,
  dayScore: 0,
};

export const mockDailyLogEvening: DailyLog = {
  date: '2026-03-21',
  meals: [
    { mealKey: 'breakfast',     optionId: 'b1', optionName: 'Eggs + bread', kcal: 480, loggedAt: '2026-03-21T07:02:00Z' },
    { mealKey: 'morningSnack',  optionId: 's2', optionName: 'Banana',       kcal: 90,  loggedAt: '2026-03-21T10:30:00Z' },
    { mealKey: 'lunch',         optionId: 'l1', optionName: 'Dal + roti',   kcal: 580, loggedAt: '2026-03-21T13:10:00Z' },
    { mealKey: 'eveningSnack',  optionId: 'es2',optionName: 'Nuts + coffee',kcal: 150, loggedAt: '2026-03-21T16:35:00Z' },
  ],
  habits: [
    { habitKey: 'morningDrink', status: 'done', loggedAt: '2026-03-21T06:47:00Z' },
  ],
  completedItems: ['06:45', '07:00', '10:30', '13:00', '16:30'],
  totalKcal: 1300,
  dayScore: 0,
};

export const mockDailyLogComplete: DailyLog = {
  date: '2026-03-21',
  meals: [
    { mealKey: 'breakfast',     optionId: 'b1', optionName: 'Eggs + bread', kcal: 480, loggedAt: '2026-03-21T07:02:00Z' },
    { mealKey: 'morningSnack',  optionId: 's1', optionName: 'Roasted chana',kcal: 120, loggedAt: '2026-03-21T10:30:00Z' },
    { mealKey: 'lunch',         optionId: 'l2', optionName: 'Chicken roti', kcal: 600, loggedAt: '2026-03-21T13:15:00Z' },
    { mealKey: 'eveningSnack',  optionId: 'es1',optionName: 'Chana',        kcal: 120, loggedAt: '2026-03-21T16:30:00Z' },
    { mealKey: 'dinner',        optionId: 'd1', optionName: 'Roti + sabji', kcal: 480, loggedAt: '2026-03-21T22:20:00Z' },
  ],
  habits: [
    { habitKey: 'morningDrink', status: 'done',    loggedAt: '2026-03-21T06:47:00Z' },
    { habitKey: 'eveningWalk',  status: 'done',    loggedAt: '2026-03-21T22:35:00Z' },
    { habitKey: 'sleep',        status: 'upcoming', loggedAt: '' },
  ],
  completedItems: ['06:45', '07:00', '10:30', '13:00', '16:30', '22:15', '22:30'],
  totalKcal: 1800,
  dayScore: 88,
};
```

---

## mockHomeState.ts

```ts
// src/data/mockHomeState.ts
// Top-level state object for the HomeScreen during mock development

export const mockHomeState = {
  user: {
    name: 'Rahul',
    goalWeightKg: 66,
    currentWeightKg: 72,
    startWeightKg: 74,
    startDate: '2026-02-28',
  },

  streak: 12,

  calorieTargets: {
    total: 1810,
    breakfast: 480,
    morningSnack: 130,
    lunch: 580,
    eveningSnack: 130,
    dinner: 490,
  },

  // Today's timeline — built from plan.weekdayRoutine in real app
  todayRoutine: [
    {
      time: '06:45',
      label: 'Morning drink',
      type: 'habit',
      habitKey: 'morningDrink',
      description: 'Ajwain-saunf water with ginger + lime',
    },
    {
      time: '07:00',
      label: 'Breakfast',
      type: 'meal',
      mealKey: 'breakfast',
      description: 'See your 5 options',
    },
    {
      time: '10:30',
      label: 'Morning snack',
      type: 'meal',
      mealKey: 'morningSnack',
      description: 'Carry in your bag',
    },
    {
      time: '13:00',
      label: 'Lunch',
      type: 'meal',
      mealKey: 'lunch',
      description: 'Biggest meal of the day',
    },
    {
      time: '16:30',
      label: 'Evening snack',
      type: 'meal',
      mealKey: 'eveningSnack',
      description: 'Before your black coffee',
    },
    {
      time: '22:15',
      label: 'Dinner',
      type: 'meal',
      mealKey: 'dinner',
      description: 'Lighter than lunch',
    },
    {
      time: '22:30',
      label: 'Evening walk',
      type: 'habit',
      habitKey: 'eveningWalk',
      description: '5–10 min slow walk',
    },
    {
      time: '23:00',
      label: 'Sleep',
      type: 'habit',
      habitKey: 'sleep',
      description: 'Target 11 PM',
    },
  ],

  // Recent week scores for HomeScreen summary (used in Tracker too)
  weekScores: [72, 85, 91, 68, 88, 75, 0], // Mon–Sun, 0 = today not done yet

  // Milestones from plan
  milestones: [
    { weightKg: 72, label: 'First 2 kg!',     weeksEstimate: 3,  reached: true  },
    { weightKg: 70, label: 'Under 70 kg',      weeksEstimate: 7,  reached: false },
    { weightKg: 68, label: 'Halfway there',    weeksEstimate: 11, reached: false },
    { weightKg: 66, label: 'Almost at goal',   weeksEstimate: 15, reached: false },
    { weightKg: 65, label: 'Goal reached!',    weeksEstimate: 17, reached: false },
  ],
};
```

---

## mockWeekHistory.ts

```ts
// src/data/mockWeekHistory.ts
// Used by both HomeScreen (streak calc) and Tracker tab

export const mockWeekHistory = [
  {
    date: '2026-03-15', // Saturday
    dayScore: 90,
    totalKcal: 1780,
    completedCount: 7,
    totalCount: 8,
    meals: ['breakfast', 'morningSnack', 'lunch', 'eveningSnack', 'dinner'],
    habits: ['morningDrink', 'eveningWalk'],
    note: 'Felt great today, energy was high',
  },
  {
    date: '2026-03-16', // Sunday
    dayScore: 85,
    totalKcal: 1820,
    completedCount: 6,
    totalCount: 8,
    meals: ['breakfast', 'lunch', 'eveningSnack', 'dinner'],
    habits: ['morningDrink', 'eveningWalk'],
    note: '',
  },
  {
    date: '2026-03-17', // Monday
    dayScore: 75,
    totalKcal: 1650,
    completedCount: 5,
    totalCount: 8,
    meals: ['breakfast', 'lunch', 'dinner'],
    habits: ['morningDrink'],
    note: 'Skipped snacks, busy day at office',
  },
  {
    date: '2026-03-18', // Tuesday
    dayScore: 88,
    totalKcal: 1790,
    completedCount: 7,
    totalCount: 8,
    meals: ['breakfast', 'morningSnack', 'lunch', 'eveningSnack', 'dinner'],
    habits: ['morningDrink', 'eveningWalk'],
    note: '',
  },
  {
    date: '2026-03-19', // Wednesday
    dayScore: 70,
    totalKcal: 1580,
    completedCount: 5,
    totalCount: 8,
    meals: ['breakfast', 'lunch', 'dinner'],
    habits: ['morningDrink', 'eveningWalk'],
    note: 'Restaurant for dinner, tried to keep it clean',
  },
  {
    date: '2026-03-20', // Thursday (yesterday)
    dayScore: 92,
    totalKcal: 1810,
    completedCount: 8,
    totalCount: 8,
    meals: ['breakfast', 'morningSnack', 'lunch', 'eveningSnack', 'dinner'],
    habits: ['morningDrink', 'eveningWalk', 'sleep'],
    note: 'Perfect day!',
  },
  {
    date: '2026-03-21', // Today (in progress)
    dayScore: 0,
    totalKcal: 600,
    completedCount: 3,
    totalCount: 8,
    meals: ['breakfast', 'morningSnack'],
    habits: ['morningDrink'],
    note: '',
  },
];
```

---

## TypeScript types for this flow

```ts
// src/types/log.ts

export interface MealLogEntry {
  mealKey: string;
  optionId: string;
  optionName: string;
  kcal: number;
  loggedAt: string; // ISO string
}

export interface HabitLogEntry {
  habitKey: string;
  status: 'done' | 'skipped' | 'upcoming';
  loggedAt: string;
}

export interface DailyLog {
  date: string;             // 'YYYY-MM-DD'
  meals: MealLogEntry[];
  habits: HabitLogEntry[];
  completedItems: string[]; // time strings e.g. ['07:00', '10:30']
  totalKcal: number;
  dayScore: number;         // 0–100
  note?: string;
}

export type ItemStatus = 'done' | 'overdue' | 'upcoming' | 'missed';

export interface TimelineItem {
  time: string;           // 'HH:MM'
  label: string;
  type: 'meal' | 'habit' | 'exercise';
  mealKey?: string;
  habitKey?: string;
  description: string;
}
```

---

## Notification schedule (implement after UI is done)

```ts
// utils/notifications.ts
// Schedule these on plan load using expo-notifications

export const scheduleMealReminders = async (weekdayRoutine: RoutineItem[]) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const mealItems = weekdayRoutine.filter(item => item.type === 'meal');

  for (const item of mealItems) {
    const [hour, minute] = item.time.split(':').map(Number);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Time for ${item.label}`,
        body: item.description,
        sound: true,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
        // Only weekdays — handle in trigger logic
      },
    });
  }
};
```