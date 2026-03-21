// utils/trackerScore.ts
// Score calculation and color/label helpers for tracker cards

export const getScoreColor = (s: number | null): string =>
  !s ? '#9B9B96' : s >= 80 ? '#1D6F42' : s >= 60 ? '#BA7517' : '#A32D2D';

export const getScoreLabel = (s: number): string =>
  s >= 90 ? 'Excellent!'
  : s >= 80 ? 'Great day'
  : s >= 70 ? 'Good — keep going'
  : s >= 60 ? 'Okay — room to improve'
  : 'Tough day — that\'s okay';

export const getWeekScoreLabel = (s: number): string =>
  s >= 85 ? 'Excellent week!'
  : s >= 75 ? 'Good week overall'
  : s >= 60 ? 'Decent — room to grow'
  : 'Tough week — reset and go';

export const getMonthScoreLabel = (s: number): string =>
  s >= 85 ? 'Outstanding month!'
  : s >= 75 ? 'Consistent — room to improve'
  : s >= 60 ? 'Average — push harder'
  : 'Below target — refocus';

export const getCalorieNote = (avg: number, target: number): string => {
  const diff = target - avg;
  if (diff > 200) return `${diff} kcal below target — good deficit for fat loss`;
  if (diff > 0)   return `${diff} kcal below target — right on track`;
  if (diff > -100) return 'Right at your calorie target — maintaining well';
  return `${Math.abs(diff)} kcal above target — try reducing dinner portions`;
};

export const getMealConsistencyColor = (hit: number, total: number): string => {
  const ratio = hit / total;
  return ratio >= 5/7 ? '#1D6F42' : ratio >= 3/7 ? '#BA7517' : '#A32D2D';
};

export const getMonthMealColor = (rate: number): string =>
  rate >= 70 ? '#1D6F42' : rate >= 50 ? '#BA7517' : '#A32D2D';

export const getHabitColor = (rate: number): string =>
  rate >= 75 ? '#1D6F42' : rate >= 50 ? '#BA7517' : '#A32D2D';
