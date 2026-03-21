# Flow 04 — Tracker (Day / Week / Month)

## Overview
The Tracker shows how consistently the user is following their
eating plan. It is food-first — the primary metrics are meals eaten
on time, daily calories vs target, and water intake. Habits
(morning drink, walk, sleep) are secondary. No heatmaps, no ritual
tracking, no gym metrics. Clean and focused.

**Score formula:**
`score = (meals on time / meals scheduled) × 60 + (habits done / habits total) × 40`
Food adherence is 60% of the score. Habits are 40%.

**Navigator:** `TrackerStack` inside `MainTabs`
**Stores:** `useDailyLogStore` · `usePlanStore` · `useWaterLogStore`
**Charts:** `react-native-gifted-charts` (bar chart for week calories)

---

## Screen inventory

| File | Description |
|------|-------------|
| `screens/main/TrackerScreen.tsx` | Container + segment control |
| `components/tracker/DayView.tsx` | Day view — all 5 cards |
| `components/tracker/WeekView.tsx` | Week view — all 6 cards |
| `components/tracker/MonthView.tsx` | Month view — all 5 cards |
| `components/tracker/ScoreCard.tsx` | Hero score ring card |
| `components/tracker/CalorieCard.tsx` | Calorie bar + meal breakdown |
| `components/tracker/MealsOnTimeCard.tsx` | 5 meal timing chips |
| `components/tracker/WaterCard.tsx` | Water intake + glass tapper |
| `components/tracker/HabitsCard.tsx` | Habits list with status |
| `components/tracker/WeekScoreCard.tsx` | Week score + 7-bar mini chart |
| `components/tracker/WeekCalorieChart.tsx` | 7-bar calorie chart |
| `components/tracker/MealConsistencyCard.tsx` | Per-meal fraction bars |
| `components/tracker/MonthScoreCard.tsx` | Month score + area chart |
| `components/tracker/MonthCalendarCard.tsx` | 30-cell score calendar |
| `components/tracker/FoodHabitsCard.tsx` | Per-meal monthly % bars |

---

## Segment control + navigation

```tsx
// screens/main/TrackerScreen.tsx
type TrackerView = 'day' | 'week' | 'month';

const [view, setView]   = useState<TrackerView>('day');
const [date, setDate]   = useState(format(new Date(), 'yyyy-MM-dd'));

const navLabel = useMemo(() => {
  if (view === 'day') {
    const isToday = date === format(new Date(), 'yyyy-MM-dd');
    return isToday ? `Today, ${format(parseISO(date), 'EEE d MMM')}`
                   : format(parseISO(date), 'EEE, d MMM');
  }
  if (view === 'week') {
    const s = startOfWeek(parseISO(date), { weekStartsOn: 1 });
    const e = endOfWeek(parseISO(date),   { weekStartsOn: 1 });
    return `${format(s, 'd MMM')} – ${format(e, 'd MMM')}`;
  }
  return format(parseISO(date), 'MMMM yyyy');
}, [view, date]);

const canGoForward = date < format(new Date(), 'yyyy-MM-dd');
```

---

## Score formula

```ts
// utils/trackerScore.ts

export const calcDayScore = (
  log: DailyLog,
  routineItems: RoutineItem[],
): number => {
  const scheduledMeals = routineItems.filter(r => r.type === 'meal');
  const totalHabits    = routineItems.filter(r => r.type === 'habit').length;

  // Meals on time: logged within ±30 min of scheduled time
  const mealsOnTime = log.meals.filter(m => {
    const item = scheduledMeals.find(r => r.mealKey === m.mealKey);
    if (!item || !m.loggedAt) return false;
    const [h, min] = item.time.split(':').map(Number);
    const scheduled = new Date(m.loggedAt);
    scheduled.setHours(h, min, 0, 0);
    return Math.abs(differenceInMinutes(parseISO(m.loggedAt), scheduled)) <= 30;
  }).length;

  const habitsCompleted = log.habits.filter(h => h.status === 'done').length;

  const foodScore  = (mealsOnTime / Math.max(scheduledMeals.length, 1)) * 60;
  const habitScore = (habitsCompleted / Math.max(totalHabits, 1)) * 40;

  return Math.round(foodScore + habitScore);
};

export const getScoreColor = (s: number | null): string =>
  !s ? '#9B9B96' : s >= 80 ? '#1D6F42' : s >= 60 ? '#BA7517' : '#A32D2D';

export const getScoreLabel = (s: number): string =>
  s >= 90 ? 'Excellent!' : s >= 80 ? 'Great day' : s >= 70 ? 'Good — keep going'
  : s >= 60 ? 'Okay — room to improve' : 'Tough day — that\'s okay';
```

---

## DAY VIEW cards

### ScoreCard
```tsx
// Hero card — big number + ring
// react-native-circular-progress-indicator
// radius: 36, strokeWidth: 6
// color: getScoreColor(score)

// Left: score number Fraunces 48px + label DM Sans 13px gray
// Right: circular ring showing same % value
```

### CalorieCard
```tsx
// Row 1: label + "X / 1810 kcal" bold green
// Row 2: progress bar — green fill proportional to logged/target
// Row 3: 5 meal chips
//   logged: kcal in green 11px
//   missed (overdue): "✗" red
//   upcoming: "—" gray

const mealChips = ['breakfast','morningSnack','lunch','eveningSnack','dinner'];
```

### MealsOnTimeCard
```tsx
// 5 pill chips in a row
// On time (logged within ±30 min): green filled "✓ HH:MM"
// Logged but late: amber "⚠ HH:MM"
// Missed (overdue, not logged): red outlined "✗ Missed"
// Upcoming: gray outlined "—"

// Below chips: summary text e.g. "2 of 5 meals done · Lunch is overdue"
```

### WaterCard
```tsx
// Water logging — new store needed

// Display:
// "X / 2.5 L" + blue progress bar
// 8 water glass icons (each = 250ml)
// Filled glasses = logged, empty = remaining
// Tapping a glass logs 250ml → triggers haptic

// useWaterLogStore:
interface WaterLogStore {
  today: { date: string; amountMl: number };
  history: { date: string; amountMl: number }[];
  logWater: (ml: number) => void;    // adds to today
  undoLastLog: () => void;
  getDayTotal: (date: string) => number;
  getWeekAvg: () => number;           // average ml/day for current week
  getMonthAvg: () => number;
}

// Target: 2500ml (2.5L) — shown as 10 glasses × 250ml
// But show only 8 glasses for space — each = 312ml
// Actually: show 10 circles, smaller, each = 250ml
```

### HabitsCard
```tsx
// Simple list — 5 habits from plan
// Each row: colored dot + name + status text
// Status: Done (green) · Upcoming (gray) · Skipped (amber) · Missed (red)
// Habits come from plan.habits.nonNegotiables — not hardcoded
```

---

## WEEK VIEW cards

### WeekScoreCard
```tsx
// Large score number (week avg) + label + 7-bar inline chart
// 7 bars built from weekHistory scores
// barWidth: 28, spacing: 4, maxHeight: 48px
// Colors: getScoreColor(score)
// Day labels: Mon Tue Wed Thu Fri Sat Sun (9px)
```

### WeekCalorieChart
```tsx
// react-native-gifted-charts BarChart
// 7 bars: one per day, height = kcal logged
// dashed horizontal reference line at plan target (1810)
// barWidth: 32, spacing: 6, chartHeight: 120

// Bar colors:
// >= target: dark green #1D6F42
// within 200 of target: medium green #5DCAA5
// < 1000: red #E24B4A (severe miss)
// today (partial): lighter opacity

// Today's bar: show with 60% opacity + small "today" label
// Future days: gray stub 4px
```

### MealConsistencyCard
```tsx
// 5 horizontal bars, one per meal type
// Bar fills to (daysLogged / 7) percentage
// Color: green >= 5/7, amber 3–4/7, red < 3/7
// Right label: "X/7" DM Sans 11px bold

// Data from weekHistory.map(day => day.meals)
```

### WaterWeekCard
```tsx
// "Avg X L/day" Fraunces 22px bold blue
// Progress bar to 2.5L
// "Hit target X of 7 days" gray note
```

### HabitsWeekCard
```tsx
// 5 habit rows
// Each row: name + 7 mini dots (filled=done, empty=missed) + fraction "X/7"
// Dot size: 8px, spacing: 2px
// Colors: green dot = done, red = missed, amber = skipped, gray = upcoming/future
```

### BestWorstCard
```tsx
// Two columns
// Best: day name + score + "X meals on time"
// Worst: day name + score + "Missed X meals"
// Colors: green left column, red right column
```

---

## MONTH VIEW cards

### MonthScoreCard
```tsx
// Large score + smooth area chart
// react-native-gifted-charts AreaChart
// areaChart: true, curved: true
// startFillColor: '#E8F5EE', endFillColor: 'transparent'
// color: '#1D6F42', thickness: 2
// Reference line at 60 (dashed amber) — minimum target line
// X labels: W1 W2 W3 W4
// No Y axis labels
```

### MonthCalendarCard
```tsx
// 30–31 cells in a grid, 5 cols × 6 rows
// Cell: 36×36px, 4px radius
// Colors same as before:
//   >= 80: #1D6F42  (dark green)
//   60–79: #5DCAA5  (teal)
//   40–59: #EF9F27  (amber)
//   < 40:  #F09595  (light red)
//   future: #F5F5F0 (gray)
//   no data: white

// Text: white on colored, gray on white/future
// Today: small 3px dot below date number
// Tappable: past days → switch to Day view for that date
```

### MonthCalorieCard
```tsx
// Two big numbers side by side:
// Actual avg vs plan target
// Info banner: interpretation ("good deficit", "slightly above", etc.)

const getCalorieNote = (avg: number, target: number): string => {
  const diff = target - avg;
  if (diff > 200) return `${diff} kcal below target — good deficit for fat loss`;
  if (diff > 0)   return `${diff} kcal below target — right on track`;
  if (diff > -100) return 'Right at your calorie target — maintaining well';
  return `${Math.abs(diff)} kcal above target — try reducing dinner portions`;
};
```

### FoodHabitsCard
```tsx
// Per-meal monthly completion %
// 5 bars, colored green >= 70%, amber 50-69%, red < 50%
// Below bars: auto-generated note about the weakest meal

const weakestMeal = mealRates.sort((a,b) => a.rate - b.rate)[0];
const note = `Your weakest meal is ${weakestMeal.label} — ` +
  getMealTip(weakestMeal.key);  // tips from a constants file
```

### WaterHabitsMonthCard
```tsx
// Two sections separated by divider:
// Water: avg L/day + days hit target / total days
// Key habits: morning drink %, evening walk %, sleep on time %, no junk %
// Horizontal bars, green/amber
```

---

## useWaterLogStore (new store)

```ts
// stores/waterLogStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WaterDay {
  date: string;    // 'YYYY-MM-DD'
  amountMl: number;
}

interface WaterLogStore {
  today: WaterDay;
  history: WaterDay[];          // last 90 days
  target: number;               // ml — default 2500

  logWater: (ml?: number) => void;   // default +250ml per tap
  undoLastLog: () => void;
  archiveToday: () => void;
  getDayTotal: (date: string) => number;
  getWeekAvg: () => number;
  getMonthAvg: (yearMonth: string) => number;
}

// Storage key: 'niyam-water-log'
// Each glass tap = +250ml
// Daily archive at midnight (same pattern as dailyLogStore)
```

---

## Required packages

```bash
npm install react-native-gifted-charts
npm install react-native-linear-gradient   # peer dep
npm install date-fns                        # already installed
npx expo install expo-haptics              # already installed
```

---

## Key UX rules

1. **Food is 60% of the score** — this is a food app first
2. Water log uses **tap-a-glass** interaction — no number input, just tap
3. Segment control **remembers last view** when tab is revisited
4. Right arrow **always disabled** at current day/week/month
5. Calendar cell tap → **switches to Day view** for that date
6. Score colors: green ≥ 80 · amber 60–79 · red < 60 — consistent everywhere
7. Week calorie chart shows **today as lighter/partial** — not a full bar
8. Monthly insight note is **auto-generated locally** — no API call
9. **No heatmaps** — the calendar grid is the only matrix visual, and it's simple
10. Water target is **2.5L** — shown as 10 × 250ml glasses

---

## File structure

```
src/
├── screens/main/TrackerScreen.tsx
├── components/tracker/
│   ├── DayView.tsx
│   ├── WeekView.tsx
│   ├── MonthView.tsx
│   ├── ScoreCard.tsx
│   ├── CalorieCard.tsx
│   ├── MealsOnTimeCard.tsx
│   ├── WaterCard.tsx
│   ├── HabitsCard.tsx
│   ├── WeekScoreCard.tsx
│   ├── WeekCalorieChart.tsx
│   ├── MealConsistencyCard.tsx
│   ├── MonthScoreCard.tsx
│   ├── MonthCalendarCard.tsx
│   ├── FoodHabitsCard.tsx
│   └── WaterHabitsMonthCard.tsx
├── stores/
│   └── waterLogStore.ts
└── utils/
    └── trackerScore.ts
```