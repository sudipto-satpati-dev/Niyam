import { format, subWeeks } from 'date-fns';
import { WeightEntry, WeightMilestone, LogRow } from '../types/weight';

// ── Dev switch ────────────────────────────────────────────────────────────────
export type WeightScenario =
  | 'normal'    // losing steadily
  | 'plateau'   // stuck for 2 weeks
  | 'gained'    // slight gain this week
  | 'new_user'; // no entries yet

export const DEV_SCENARIO: WeightScenario = 'normal' as WeightScenario;
// ─────────────────────────────────────────────────────────────────────────────

const w = (n: number) => format(subWeeks(new Date(), n), 'yyyy-MM-dd');

// ── Scenario: normal (steady loss) ───────────────────────────────────────────
export const mockWeightEntriesNormal: WeightEntry[] = [
  { date: w(7), weightKg: 74.0 },  // start
  { date: w(6), weightKg: 73.7 },
  { date: w(5), weightKg: 73.2 },
  { date: w(4), weightKg: 73.0 },
  { date: w(3), weightKg: 72.8 },
  { date: w(2), weightKg: 72.5 },  // slight plateau here
  { date: w(1), weightKg: 72.8 },  // tiny uptick
  { date: w(0), weightKg: 72.0 },  // good drop this week
];

// ── Scenario: plateau (stuck) ─────────────────────────────────────────────────
export const mockWeightEntriesPlateau: WeightEntry[] = [
  { date: w(6), weightKg: 74.0 },
  { date: w(5), weightKg: 73.5 },
  { date: w(4), weightKg: 73.1 },
  { date: w(3), weightKg: 72.9 },
  { date: w(2), weightKg: 72.9 },  // plateau begins
  { date: w(1), weightKg: 72.8 },
  { date: w(0), weightKg: 72.9 },  // barely moving
];

// ── Scenario: gained slightly ──────────────────────────────────────────────────
export const mockWeightEntriesGained: WeightEntry[] = [
  { date: w(5), weightKg: 74.0 },
  { date: w(4), weightKg: 73.4 },
  { date: w(3), weightKg: 72.8 },
  { date: w(2), weightKg: 72.4 },
  { date: w(1), weightKg: 72.0 },
  { date: w(0), weightKg: 72.4 },  // went up 0.4 this week
];

// ── Scenario: new user ────────────────────────────────────────────────────────
export const mockWeightEntriesNewUser: WeightEntry[] = [];

// ── Active entries (change this to switch scenarios) ──────────────────────────
const scenarioMap = {
  normal:   mockWeightEntriesNormal,
  plateau:  mockWeightEntriesPlateau,
  gained:   mockWeightEntriesGained,
  new_user: mockWeightEntriesNewUser,
};
export const mockWeightEntries = scenarioMap[DEV_SCENARIO];

// ── User profile ──────────────────────────────────────────────────────────────
export const mockWeightProfile = {
  startWeightKg:   74.0,
  currentWeightKg: mockWeightEntries.at(-1)?.weightKg ?? 74.0,
  goalWeightKg:    66.0,
  startDate:       w(7),
};

// ── Derived stats ─────────────────────────────────────────────────────────────
export const mockWeightStats = {
  lostKg:          parseFloat((mockWeightProfile.startWeightKg - mockWeightProfile.currentWeightKg).toFixed(1)),
  remainingKg:     parseFloat((mockWeightProfile.currentWeightKg - mockWeightProfile.goalWeightKg).toFixed(1)),
  progressPct:     Math.round(
    ((mockWeightProfile.startWeightKg - mockWeightProfile.currentWeightKg) /
     (mockWeightProfile.startWeightKg - mockWeightProfile.goalWeightKg)) * 100
  ),
  weeklyLossRate:  0.5, // kg/week average
  etaMonthYear:    'July 2026',
  isPlateau:       DEV_SCENARIO === 'plateau',
  hasGained:       DEV_SCENARIO === 'gained',
};

// ── Milestones ────────────────────────────────────────────────────────────────
export const mockMilestones: WeightMilestone[] = [
  { weightKg: 72, label: 'First 2 kg!',   weeksEstimate: 3,  reached: true,  isCurrent: true  },
  { weightKg: 70, label: 'Under 70 kg',   weeksEstimate: 7,  reached: false, isCurrent: false },
  { weightKg: 68, label: 'Halfway',        weeksEstimate: 11, reached: false, isCurrent: false },
  { weightKg: 66, label: 'Almost there',  weeksEstimate: 15, reached: false, isCurrent: false },
  { weightKg: 65, label: 'Goal!',         weeksEstimate: 17, reached: false, isCurrent: false },
];

// ── Log history rows (for WeightLogHistory component) ────────────────────────
export const mockLogRows: LogRow[] = mockWeightEntries
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((entry, i, arr) => {
    const prev = arr[i + 1];
    if (!prev) return { ...entry, changePill: { text: 'Start', color: 'gray' as const } };
    const diff = parseFloat((entry.weightKg - prev.weightKg).toFixed(1));
    return {
      ...entry,
      changePill: {
        text: diff < 0 ? `−${Math.abs(diff).toFixed(1)} kg` : `+${diff.toFixed(1)} kg`,
        color: diff <= 0 ? 'green' as const : 'red' as const,
      },
    };
  });

// ── Projection data (for dotted line on chart) ────────────────────────────────
// Project from current weight to goal at 0.5 kg/week
export const mockProjectionEntries: WeightEntry[] = (() => {
  const result: WeightEntry[] = [];
  const last = mockWeightEntries.at(-1);
  if (!last) return result;
  let w = last.weightKg;
  let date = new Date(last.date);
  while (w > mockWeightProfile.goalWeightKg && result.length < 20) {
    date = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    w = parseFloat((w - 0.5).toFixed(1));
    result.push({
      date: format(date, 'yyyy-MM-dd'),
      weightKg: Math.max(w, mockWeightProfile.goalWeightKg),
    });
  }
  return result;
})();
