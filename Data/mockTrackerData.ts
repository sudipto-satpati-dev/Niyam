// Data/mockTrackerData.ts
// Mock data for the Tracker flow (Day / Week / Month views)

const today = new Date();
const todayStr = formatDate(today);

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function subDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return formatDate(d);
}

// ── Dev switches ───────────────────────────────────────────────────────
export type DevView     = 'day' | 'week' | 'month';
export type DevScenario = 'today_midday' | 'great_day' | 'bad_day' | 'new_user';
export const DEV_VIEW:     DevView     = 'day';
export const DEV_SCENARIO: DevScenario = 'today_midday';

// ── Today mid-day (score 74) ───────────────────────────────────────────
export const mockTodayMidDay = {
  date: todayStr,
  score: 74,
  meals: [
    { mealKey: 'breakfast',    kcal: 480, loggedAt: `${todayStr}T07:05:00Z`, onTime: true  },
    { mealKey: 'morningSnack', kcal: 120, loggedAt: `${todayStr}T10:38:00Z`, onTime: true  },
    // lunch: missed (overdue)
    // eveningSnack, dinner: upcoming
  ],
  mealsOnTime: 2,
  mealsMissed: 1,
  mealsUpcoming: 2,
  habits: [
    { key: 'morningDrink', label: 'Morning drink', status: 'done'     },
    { key: 'exercise',     label: 'Exercise',      status: 'rest_day' },
    { key: 'eveningWalk',  label: 'Evening walk',  status: 'done'     },
    { key: 'sleepOnTime',  label: 'Sleep by 11 PM', status: 'upcoming' },
    { key: 'noJunkFood',   label: 'No junk food',  status: 'done'     },
  ],
  totalKcal: 600,
  targetKcal: 1810,
  waterMl: 1200,
  waterTargetMl: 2500,
  note: '',
};

// ── Great day (score 92) ────────────────────────────────────────────────
export const mockGreatDay = {
  date: subDays(4),
  score: 92,
  meals: [
    { mealKey: 'breakfast',    kcal: 480, loggedAt: `${subDays(4)}T07:02:00Z`, onTime: true },
    { mealKey: 'morningSnack', kcal: 120, loggedAt: `${subDays(4)}T10:30:00Z`, onTime: true },
    { mealKey: 'lunch',        kcal: 580, loggedAt: `${subDays(4)}T13:05:00Z`, onTime: true },
    { mealKey: 'eveningSnack', kcal: 120, loggedAt: `${subDays(4)}T16:32:00Z`, onTime: true },
    { mealKey: 'dinner',       kcal: 480, loggedAt: `${subDays(4)}T22:18:00Z`, onTime: true },
  ],
  mealsOnTime: 5, mealsMissed: 0, mealsUpcoming: 0,
  habits: [
    { key: 'morningDrink', label: 'Morning drink', status: 'done' },
    { key: 'exercise',     label: 'Exercise',      status: 'done' },
    { key: 'eveningWalk',  label: 'Evening walk',  status: 'done' },
    { key: 'sleepOnTime',  label: 'Sleep by 11 PM', status: 'done' },
    { key: 'noJunkFood',   label: 'No junk food',  status: 'done' },
  ],
  totalKcal: 1780, targetKcal: 1810,
  waterMl: 2500,   waterTargetMl: 2500,
  note: 'Felt great, no bloating, lots of energy.',
};

// ── Bad day (score 48) ──────────────────────────────────────────────────
export const mockBadDay = {
  date: subDays(5),
  score: 48,
  meals: [
    { mealKey: 'breakfast', kcal: 480, loggedAt: `${subDays(5)}T07:10:00Z`, onTime: true  },
    { mealKey: 'dinner',    kcal: 480, loggedAt: `${subDays(5)}T22:40:00Z`, onTime: false },
  ],
  mealsOnTime: 1, mealsMissed: 3, mealsUpcoming: 0,
  habits: [
    { key: 'morningDrink', label: 'Morning drink', status: 'done'   },
    { key: 'exercise',     label: 'Exercise',      status: 'missed' },
    { key: 'eveningWalk',  label: 'Evening walk',  status: 'missed' },
    { key: 'sleepOnTime',  label: 'Sleep by 11 PM', status: 'done'   },
    { key: 'noJunkFood',   label: 'No junk food',  status: 'missed' },
  ],
  totalKcal: 960, targetKcal: 1810,
  waterMl: 800,   waterTargetMl: 2500,
  note: 'Very busy at office, back-to-back meetings.',
};

// ── Week data ──────────────────────────────────────────────────────────
export const mockWeekDays = [
  { date: subDays(6), label: 'Mon', score: 85, kcal: 1760, waterMl: 2200,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:true, sleepOnTime:true, noJunkFood:true },
  },
  { date: subDays(5), label: 'Tue', score: 48, kcal: 960,  waterMl: 800,
    mealsHit: { breakfast:true, morningSnack:false, lunch:false, eveningSnack:false, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:false, sleepOnTime:true, noJunkFood:false },
  },
  { date: subDays(4), label: 'Wed', score: 92, kcal: 1810, waterMl: 2500,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:true, eveningWalk:true, sleepOnTime:true, noJunkFood:true },
  },
  { date: subDays(3), label: 'Thu', score: 78, kcal: 1690, waterMl: 2000,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:false, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:false, sleepOnTime:true, noJunkFood:true },
  },
  { date: subDays(2), label: 'Fri', score: 88, kcal: 1790, waterMl: 2300,
    mealsHit: { breakfast:true, morningSnack:true, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:false, eveningWalk:true, sleepOnTime:false, noJunkFood:true },
  },
  { date: subDays(1), label: 'Sat', score: 72, kcal: 1640, waterMl: 1800,
    mealsHit: { breakfast:true, morningSnack:false, lunch:true, eveningSnack:true, dinner:true },
    habits: { morningDrink:true, exercise:true, eveningWalk:false, sleepOnTime:true, noJunkFood:true },
  },
  { date: todayStr, label: 'Sun', score: 0, kcal: 600, waterMl: 1200,
    mealsHit: { breakfast:true, morningSnack:true, lunch:false, eveningSnack:false, dinner:false },
    habits: { morningDrink:true, exercise:false, eveningWalk:false, sleepOnTime:false, noJunkFood:false },
  },
];

// Derived week stats
const completedDays = mockWeekDays.filter(d => d.score > 0);
export const mockWeekAvgScore = Math.round(
  completedDays.reduce((a, b) => a + b.score, 0) / completedDays.length
); // ~77

export const mockWeekAvgKcal = Math.round(
  completedDays.reduce((a, b) => a + b.kcal, 0) / completedDays.length
);

export const mockWeekAvgWater = Math.round(
  mockWeekDays.filter(d => d.waterMl > 0).reduce((a, b) => a + b.waterMl, 0) /
  mockWeekDays.filter(d => d.waterMl > 0).length
);

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
  exercise:     { hit: 2, total: 7 },
  eveningWalk:  { hit: 4, total: 7 },
  sleepOnTime:  { hit: 5, total: 7 },
  noJunkFood:   { hit: 5, total: 7 },
};

// ── Month data ─────────────────────────────────────────────────────────
const rawScores = [88,72,92,78,85,80,48,88,76,82,91,70,85,88,48,78,88,92,0];
export const mockMonthScores: Record<string, number> = {};
rawScores.forEach((score, i) => {
  mockMonthScores[subDays(18 - i)] = score;
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
