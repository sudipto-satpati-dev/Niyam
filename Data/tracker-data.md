# Mock Data — Tracker Flow (Food-First)

---

## mockTrackerData.ts

```ts
// src/data/mockTrackerData.ts
import { format, subDays } from 'date-fns';

// ── Dev switches ─────────────────────────────────────────────────────────────
export type DevView     = 'day' | 'week' | 'month';
export type DevScenario = 'today_midday' | 'great_day' | 'bad_day' | 'new_user';
export const DEV_VIEW:     DevView     = 'day';
export const DEV_SCENARIO: DevScenario = 'today_midday';
// ─────────────────────────────────────────────────────────────────────────────

const today = format(new Date(), 'yyyy-MM-dd');
const d = (n: number) => format(subDays(new Date(), n), 'yyyy-MM-dd');

// ── Today mid-day (score 74) ──────────────────────────────────────────────────
export const mockTodayMidDay = {
  date: today,
  score: 74,
  meals: [
    { mealKey: 'breakfast',    kcal: 480, loggedAt: `${today}T07:05:00Z`, onTime: true  },
    { mealKey: 'morningSnack', kcal: 120, loggedAt: `${today}T10:38:00Z`, onTime: true  },
    // lunch: missed (overdue)
    // eveningSnack, dinner: upcoming
  ],
  mealsOnTime: 2,
  mealsMissed: 1,
  mealsUpcoming: 2,
  habits: [
    { key: 'morningDrink', status: 'done'     },
    { key: 'exercise',     status: 'rest_day' },
    { key: 'eveningWalk',  status: 'done'     },
    { key: 'sleepOnTime',  status: 'upcoming' },
    { key: 'noJunkFood',   status: 'done'     },
  ],
  totalKcal: 600,
  targetKcal: 1810,
  waterMl: 1200,
  waterTargetMl: 2500,
  note: '',
};

// ── Great day (score 92) ──────────────────────────────────────────────────────
export const mockGreatDay = {
  date: d(4),
  score: 92,
  meals: [
    { mealKey: 'breakfast',    kcal: 480, loggedAt: `${d(4)}T07:02:00Z`, onTime: true },
    { mealKey: 'morningSnack', kcal: 120, loggedAt: `${d(4)}T10:30:00Z`, onTime: true },
    { mealKey: 'lunch',        kcal: 580, loggedAt: `${d(4)}T13:05:00Z`, onTime: true },
    { mealKey: 'eveningSnack', kcal: 120, loggedAt: `${d(4)}T16:32:00Z`, onTime: true },
    { mealKey: 'dinner',       kcal: 480, loggedAt: `${d(4)}T22:18:00Z`, onTime: true },
  ],
  mealsOnTime: 5, mealsMissed: 0, mealsUpcoming: 0,
  habits: [
    { key: 'morningDrink', status: 'done' },
    { key: 'exercise',     status: 'done' },
    { key: 'eveningWalk',  status: 'done' },
    { key: 'sleepOnTime',  status: 'done' },
    { key: 'noJunkFood',   status: 'done' },
  ],
  totalKcal: 1780, targetKcal: 1810,
  waterMl: 2500,   waterTargetMl: 2500,
  note: 'Felt great, no bloating, lots of energy.',
};

// ── Bad day (score 48) ────────────────────────────────────────────────────────
export const mockBadDay = {
  date: d(5),
  score: 48,
  meals: [
    { mealKey: 'breakfast', kcal: 480, loggedAt: `${d(5)}T07:10:00Z`, onTime: true  },
    { mealKey: 'dinner',    kcal: 480, loggedAt: `${d(5)}T22:40:00Z`, onTime: false }, // late
  ],
  mealsOnTime: 1, mealsMissed: 3, mealsUpcoming: 0,
  habits: [
    { key: 'morningDrink', status: 'done'   },
    { key: 'exercise',     status: 'missed' },
    { key: 'eveningWalk',  status: 'missed' },
    { key: 'sleepOnTime',  status: 'done'   },
    { key: 'noJunkFood',   status: 'missed' },
  ],
  totalKcal: 960, targetKcal: 1810,
  waterMl: 800,   waterTargetMl: 2500,
  note: 'Very busy at office, back-to-back meetings.',
};

// ── Week data ─────────────────────────────────────────────────────────────────
export const mockWeekDays = [
  { date: d(6), label: 'Mon', score: 85, kcal: 1760, waterMl: 2200,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:true, sleepOnTime:true, noJunkFood:true },
  },
  { date: d(5), label: 'Tue', score: 48, kcal: 960,  waterMl: 800,
    mealsHit: { breakfast:true, morningSnack:false, lunch:false, eveningSnack:false, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:false, sleepOnTime:true, noJunkFood:false },
  },
  { date: d(4), label: 'Wed', score: 92, kcal: 1810, waterMl: 2500,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:true, eveningWalk:true, sleepOnTime:true, noJunkFood:true },
  },
  { date: d(3), label: 'Thu', score: 78, kcal: 1690, waterMl: 2000,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:false, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:false, sleepOnTime:true, noJunkFood:true },
  },
  { date: d(2), label: 'Fri', score: 88, kcal: 1790, waterMl: 2300,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:true, sleepOnTime:false, noJunkFood:true },
  },
  { date: d(1), label: 'Sat', score: 72, kcal: 1640, waterMl: 1800,
    mealsHit: { breakfast:true, morningSnack:false, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:true, eveningWalk:false, sleepOnTime:true, noJunkFood:true },
  },
  { date: today, label: 'Sun', score: 0, kcal: 600, waterMl: 1200,
    mealsHit: { breakfast:true, morningSnack:true, lunch:false, eveningSnack:false, dinner:false },
    habits: { morningDrink:true, exercise:false, eveningWalk:false, sleepOnTime:false, noJunkFood:false },
  },
];

// Derived week stats
export const mockWeekAvgScore = Math.round(
  mockWeekDays.filter(d => d.score > 0).reduce((a,b) => a + b.score, 0) /
  mockWeekDays.filter(d => d.score > 0).length
); // ~77

export const mockWeekAvgKcal = Math.round(
  mockWeekDays.filter(d => d.kcal > 0).reduce((a,b) => a + b.kcal, 0) /
  mockWeekDays.filter(d => d.kcal > 0).length
); // ~1595 excl today

export const mockWeekAvgWater = Math.round(
  mockWeekDays.filter(d => d.waterMl > 0).reduce((a,b) => a + b.waterMl, 0) /
  mockWeekDays.filter(d => d.waterMl > 0).length
); // ~1943ml ≈ 1.9L

// Meal consistency for the week (days hit / 7)
export const mockWeekMealConsistency = {
  breakfast:    { hit: 7, total: 7 },
  morningSnack: { hit: 4, total: 7 },
  lunch:        { hit: 5, total: 7 },
  eveningSnack: { hit: 5, total: 7 },
  dinner:       { hit: 6, total: 7 },
};

// Habit consistency for the week
export const mockWeekHabitConsistency = {
  morningDrink: { hit: 7, total: 7 },
  exercise:     { hit: 2, total: 7 },  // weekends only
  eveningWalk:  { hit: 4, total: 7 },
  sleepOnTime:  { hit: 5, total: 7 },
  noJunkFood:   { hit: 5, total: 7 },
};

// ── Month data ────────────────────────────────────────────────────────────────
const rawScores = [88,72,92,78,85,80,48,88,76,82,91,70,85,88,48,78,88,92,0];
export const mockMonthScores: Record<string, number> = {};
rawScores.forEach((score, i) => {
  mockMonthScores[d(18 - i)] = score;
});

export const mockMonthStats = {
  avgScore:     76,
  avgKcal:      1680,
  targetKcal:   1810,
  daysTracked:  18,
  bestStreak:   12,
  avgWaterL:    1.8,
  waterTargetL: 2.5,
  daysHitWater: 12,
};

// Per-meal monthly completion rates
export const mockMonthMealRates = {
  breakfast:    90,
  lunch:        78,
  dinner:       85,
  morningSnack: 65,
  eveningSnack: 62,
};

// Per-habit monthly completion rates
export const mockMonthHabitRates = {
  morningDrink: 95,
  eveningWalk:  60,
  sleepOnTime:  70,
  noJunkFood:   75,
};

// Score trend for area chart (18 data points)
export const mockScoreTrend = rawScores.filter(s => s > 0);

// Meal tips for weakest meal note
export const MEAL_TIPS: Record<string, string> = {
  morningSnack: 'try keeping roasted chana in your bag every day',
  eveningSnack: 'set a 4:30 PM reminder and keep nuts at your desk',
  lunch:        'order from the canteen instead of skipping — even a small meal helps',
  breakfast:    'boil eggs the night before so morning prep takes under 5 min',
  dinner:       'leave office by 9 PM so you have time to eat before 11 PM',
};
```