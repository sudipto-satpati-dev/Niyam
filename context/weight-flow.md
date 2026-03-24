# Flow 05 — Weight Tab

## Overview
The Weight tab tracks the user's weekly weigh-in and shows their
progress toward their goal weight. It is calm and encouraging —
weight loss is slow and the UI acknowledges that. One log per week.
The chart shows the trend, not daily noise. Milestones celebrate
real progress without being over-the-top.

**Key principle:** Log once a week, same day, same time (morning).
No daily weigh-ins — they create anxiety. The app nudges but never nags.

**Navigator:** `WeightStack` inside `MainTabs`
**Stores:** `useWeightLogStore` · `usePlanStore` · `useUserStore`
**Charts:** `react-native-gifted-charts` LineChart

---

## Screen inventory

| File | Description |
|------|-------------|
| `screens/main/WeightScreen.tsx` | Main weight tab | 
| `components/weight/WeightStatusCard.tsx` | Current / lost / goal hero |
| `components/weight/WeightChartCard.tsx` | Line chart + projection |
| `components/weight/WeightLogHistory.tsx` | Weekly entry list |
| `components/weight/MilestoneStrip.tsx` | Scrollable milestone cards |
| `components/weight/WeightLogSheet.tsx` | Log entry bottom sheet |
| `components/modals/MilestoneModal.tsx` | Celebration modal |

---

## Navigation

```
WeightStack
  ├── WeightScreen (default)
  │     ├── tap "Log weight"   → WeightLogSheet (bottom sheet 50%)
  │     └── milestone hit      → MilestoneModal (auto, after log)
  └── (no sub-screens)
```

---

## WeightScreen layout

```
┌─────────────────────────────┐
│ Weight            [Log now] │  ← Header
├─────────────────────────────┤
│ Current  │ Lost  │  Goal    │  ← WeightStatusCard
│  72.0kg  │ 2.0kg │  66kg   │
│ ═══════●═══════════════════ │  ← Progress bar
├─────────────────────────────┤
│ Progress chart (8 weeks)    │  ← WeightChartCard
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿··········→ │
├─────────────────────────────┤
│ Log history                 │  ← WeightLogHistory
│ Mar 21 · 72.0 · -0.8kg    │
│ Mar 14 · 72.8 · -0.4kg    │
├─────────────────────────────┤
│ [72✓] [70] [68] [66] [65]  │  ← MilestoneStrip (scrollable)
└─────────────────────────────┘
```

---

## WeightStatusCard

```tsx
// components/weight/WeightStatusCard.tsx

interface WeightStatusCardProps {
  currentWeight: number;
  startWeight: number;
  goalWeight: number;
}

const lostKg = startWeight - currentWeight;
const totalToLose = startWeight - goalWeight;
const progressPct = Math.min((lostKg / totalToLose) * 100, 100);

// Three columns: Current | Lost | Goal
// Lost column color: green if lostKg > 0, amber if lostKg < last week's lost
// Goal column: always purple #4B3F9E

// Progress bar below columns:
// Track: full width, 10px height, gray #E5E5E2
// Fill: green, width = progressPct %
// Dot: white circle 16px, green border 2px, positioned at progressPct %
// Labels: "74 kg" left, "66 kg" right (10px gray)
// Dot label: current weight in 11px green above the dot
```

---

## WeightChartCard

```tsx
// components/weight/WeightChartCard.tsx
// react-native-gifted-charts LineChart

interface WeightChartCardProps {
  entries: WeightEntry[];        // actual logged entries
  goalWeight: number;
  projectedEntries: WeightEntry[]; // future projection dots
}

// Chart config:
// curved: true
// dataPointsColor: '#1D6F42'
// color: '#1D6F42'
// thickness: 2
// height: 160
// hideYAxisText: true
// hideAxes: false (show light X axis line)
// xAxisLabelTextStyle: { fontSize: 10, color: '#9B9B96' }
// showReferenceLine: { y: goalWeight, color: '#4B3F9E', thickness: 1, type: 'dashed' }

// Projection line (future entries):
// secondaryData: projectedEntries
// secondaryLineConfig: { color: '#1D6F42', thickness: 1, opacity: 0.35, type: 'dashed' }

// Note below chart: rate of loss + ETA
const weeklyLoss = calcWeeklyLossRate(entries);  // avg kg per week
const weeksToGoal = (currentWeight - goalWeight) / weeklyLoss;
const eta = format(addWeeks(new Date(), weeksToGoal), 'MMMM yyyy');
// "Losing ~X.X kg/week · On track for goal by {eta}"
```

### Weekly loss rate calculation
```ts
// utils/weightUtils.ts

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
```

### Plateau detection
```ts
export const detectPlateau = (entries: WeightEntry[]): boolean => {
  if (entries.length < 3) return false;
  const last3 = entries.slice(-3);
  const variance = Math.max(...last3.map(e => e.weightKg)) -
                   Math.min(...last3.map(e => e.weightKg));
  return variance < 0.3; // less than 300g change across 3 weeks = plateau
};
```

---

## WeightLogHistory

```tsx
// components/weight/WeightLogHistory.tsx

interface LogRow {
  date: string;
  weightKg: number;
  changePill: {
    text: string;           // e.g. "−0.8 kg" or "+0.4 kg" or "Start"
    color: 'green' | 'red' | 'gray';
  };
}

// Build from weightLog entries sorted newest-first
const buildLogRows = (entries: WeightEntry[]): LogRow[] => {
  const sorted = [...entries].sort((a,b) =>
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );
  return sorted.map((entry, i) => {
    const prev = sorted[i + 1];
    if (!prev) return { ...entry, changePill: { text: 'Start', color: 'gray' } };
    const diff = entry.weightKg - prev.weightKg;
    return {
      ...entry,
      changePill: {
        text: diff < 0 ? `−${Math.abs(diff).toFixed(1)} kg` : `+${diff.toFixed(1)} kg`,
        color: diff < 0 ? 'green' : 'red',
      },
    };
  });
};

// Show 5 entries by default, "Load more" reveals all
const [showAll, setShowAll] = useState(false);
const visible = showAll ? rows : rows.slice(0, 5);
```

---

## MilestoneStrip

```tsx
// components/weight/MilestoneStrip.tsx
// Horizontal ScrollView, each card 120×80px, 10px radius

interface MilestoneCardProps {
  weightKg: number;
  label: string;
  isCurrent: boolean;    // just reached this milestone
  isReached: boolean;    // reached in the past
}

// Reached: #E8F5EE bg, green border 1px, green checkmark 16px, green text
// Current (just hit): same as reached + a 2px green ring outside the card
// Unreached: white bg, #E5E5E2 border, gray text
// Future cards are not tappable
```

---

## WeightLogSheet

```tsx
// components/weight/WeightLogSheet.tsx
// @gorhom/bottom-sheet, snapPoints: ['50%']

interface WeightLogSheetProps {
  lastWeight: number;
  lastDate: string;
  onSave: (weight: number) => void;
  onClose: () => void;
}

const [weight, setWeight] = useState(lastWeight);

// Input method: + / − buttons changing weight by 0.1kg
// Or: custom number pad (preferred — more precise)
// Validate: 30 < weight < 250 (basic sanity check)
// One log per week — if user tries to log twice in same week,
//   show: "You already logged this week (Mar 14: 72.8 kg). Update it?"

const handleSave = () => {
  if (weight < 30 || weight > 250) return; // silent validation
  useWeightLogStore.getState().logWeight({
    date: format(new Date(), 'yyyy-MM-dd'),
    weightKg: weight,
  });
  checkAndShowMilestone(weight);
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  onClose();
};
```

---

## useWeightLogStore

```ts
// stores/weightLogStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WeightEntry {
  date: string;       // 'YYYY-MM-DD'
  weightKg: number;
}

interface WeightLogStore {
  entries: WeightEntry[];
  completedMilestoneWeights: number[];

  logWeight: (entry: WeightEntry) => void;
  updateEntry: (date: string, weightKg: number) => void;
  getCurrentWeight: () => number | null;
  getWeeklyRate: () => number;
  hasLoggedThisWeek: () => boolean;
  addCompletedMilestone: (kg: number) => void;
}

// Persist key: 'niyam-weight-log'

// logWeight adds or replaces entry for the same week
// (if user logs twice in same week, update not duplicate)
```

---

## Milestone check

```ts
// Called after every weight log — in WeightScreen or WeightLogSheet

const checkAndShowMilestone = (newWeight: number) => {
  const milestones = usePlanStore.getState().plan.milestones;
  const completed  = useWeightLogStore.getState().completedMilestoneWeights;

  const hit = milestones.find(m =>
    newWeight <= m.weightKg && !completed.includes(m.weightKg)
  );

  if (hit) {
    useWeightLogStore.getState().addCompletedMilestone(hit.weightKg);
    setActiveMilestone(hit);
    setShowMilestoneModal(true);
  }
};
```

---

## Weekly log nudge (notification)

```ts
// Schedule a weekly notification on the user's preferred weigh-in day
// Default: Saturday morning 8 AM
// Set up in expo-notifications when plan is loaded

await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Time to log your weight',
    body: 'Hop on the scale and log it in Niyam — takes 10 seconds.',
    sound: true,
  },
  trigger: {
    weekday: 7,   // Saturday (1=Sunday ... 7=Saturday in Expo)
    hour: 8,
    minute: 0,
    repeats: true,
  },
});
```

---

## Screen states

| State | Trigger | UI change |
|-------|---------|-----------|
| Normal | Has entries, losing weight | Standard layout |
| Plateau | < 0.3kg change in 3 weeks | Amber info card below chart |
| Weight up | Latest entry > previous | Amber note, red change pill, amber "Lost" column |
| No entries | New user | Empty chart, green CTA banner |
| Milestone | New entry hits milestone weight | MilestoneModal auto-shows |

---

## Key UX rules

1. **One log per week** — if logged twice in same week, update not duplicate
2. **Never show red for plateau or small gain** — amber only, warm message
3. Progress bar dot shows **current weight position** between start and goal
4. Chart projection line uses **40% opacity** — clearly a forecast, not fact
5. Milestone modal appears **automatically** after saving the triggering weight
6. The "Log weight" button in header shows a **nudge badge** if not logged this week
7. Weight is always shown to **1 decimal place** (72.0 not 72)
8. Log history shows **change pill** colored green (loss) or red (gain) — only place red appears
9. **No BMI display** — it adds anxiety without adding value
10. Chart Y-axis is **implicit** — no labels, just the line trend matters

---

## File structure

```
src/
├── screens/main/WeightScreen.tsx
├── components/weight/
│   ├── WeightStatusCard.tsx
│   ├── WeightChartCard.tsx
│   ├── WeightLogHistory.tsx
│   ├── MilestoneStrip.tsx
│   └── WeightLogSheet.tsx
├── components/modals/
│   └── MilestoneModal.tsx        ← shared with Home flow
├── stores/
│   └── weightLogStore.ts
└── utils/
    └── weightUtils.ts
```
