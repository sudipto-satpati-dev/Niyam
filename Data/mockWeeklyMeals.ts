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
