import { parseISO, format, addWeeks, differenceInWeeks } from 'date-fns';
import { WeightEntry } from '../types/weight';

export const calcWeeklyLossRate = (entries: WeightEntry[]): number => {
  if (entries.length < 2) return 0;
  const sorted = [...entries].sort((a, b) =>
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );
  const first = sorted[0];
  const last  = sorted[sorted.length - 1];
  const weeks = differenceInWeeks(parseISO(last.date), parseISO(first.date));
  if (weeks === 0) return 0;
  return parseFloat(((first.weightKg - last.weightKg) / weeks).toFixed(2));
};

export const generateProjection = (
  entries: WeightEntry[],
  goalWeight: number,
  weeklyRate: number,
): WeightEntry[] => {
  if (!entries.length || weeklyRate <= 0) return [];
  const last = entries[entries.length - 1];
  const projection: WeightEntry[] = [];
  let w = last.weightKg;
  let date = parseISO(last.date);
  while (w > goalWeight) {
    date = addWeeks(date, 1);
    w = parseFloat((w - weeklyRate).toFixed(1));
    projection.push({ date: format(date, 'yyyy-MM-dd'), weightKg: Math.max(w, goalWeight) });
    if (projection.length > 26) break; // cap at 6 months
  }
  return projection;
};

export const detectPlateau = (entries: WeightEntry[]): boolean => {
  if (entries.length < 3) return false;
  const last3 = entries.slice(-3);
  const variance = Math.max(...last3.map(e => e.weightKg)) -
                   Math.min(...last3.map(e => e.weightKg));
  return variance < 0.3; // less than 300g change across 3 weeks = plateau
};
