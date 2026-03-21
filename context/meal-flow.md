# Flow 03 — Meals Tab

## Overview
The Meals tab is the plan reference and logging hub. Users browse
their AI-generated meal options (A–E per meal type), log what they
ate directly from this screen, and see a running calorie total for
the day. It is also accessible for quick logging without opening
a bottom sheet — tap "Log" on any card and it's done.

**Navigator:** `MealsStack` inside `MainTabs`
**Stores:** `usePlanStore` · `useDailyLogStore`

---

## Screen inventory

| File | Description | Type |
|------|-------------|------|
| `screens/main/MealsScreen.tsx` | Main meals browser | Tab screen |
| `screens/main/WeeklyMealsScreen.tsx` | This-week overview | Stack screen |
| `components/meals/MealTabBar.tsx` | Horizontal scrollable tabs | Component |
| `components/meals/MealOptionCard.tsx` | Single meal option card | Component |
| `components/meals/CalorieSummaryBar.tsx` | Daily kcal progress bar | Component |
| `components/meals/MealDetailSheet.tsx` | Full meal detail | Bottom sheet |
| `components/meals/DefaultPlanNote.tsx` | AI recommendation note | Component |

---

## Navigation

```
MealsStack
  ├── MealsScreen (default)
  │     ├── tap card body      → MealDetailSheet (bottom sheet 80%)
  │     ├── tap "Log" button   → log inline, no sheet needed
  │     └── tap "This week"    → WeeklyMealsScreen
  └── WeeklyMealsScreen
        └── back               → MealsScreen
```

---

## MealsScreen

### State
```tsx
const [activeMealType, setActiveMealType] = useState<MealType>('breakfast');

// Derive from planStore
const mealOptions = usePlanStore(s => s.plan.meals[activeMealType]);

// Derive from dailyLogStore
const todayMeals = useDailyLogStore(s => s.today.meals);
const totalKcal = useDailyLogStore(s => s.getTodayKcal());
const targetKcal = usePlanStore(s => s.plan.calorieTargets.total);

// Which option is already logged for active meal type
const loggedOption = todayMeals.find(m => m.mealKey === activeMealType);
```

### Tab order and labels
```ts
export type MealType =
  | 'breakfast'
  | 'morningSnack'
  | 'lunch'
  | 'eveningSnack'
  | 'dinner';

export const MEAL_TAB_LABELS: Record<MealType, string> = {
  breakfast:    'Breakfast',
  morningSnack: 'Snack',
  lunch:        'Lunch',
  eveningSnack: 'Eve Snack',
  dinner:       'Dinner',
};

// Auto-select tab logic on screen focus:
// Open the tab for the next upcoming/overdue meal
// based on current time and dailyLog
const getDefaultTab = (): MealType => {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 9)  return 'breakfast';
  if (hour < 12) return 'morningSnack';
  if (hour < 15) return 'lunch';
  if (hour < 19) return 'eveningSnack';
  return 'dinner';
};
```

### Inline log (no sheet)
```tsx
// Tapping "Log" button on a card logs directly
const handleInlineLog = (option: MealOption) => {
  useDailyLogStore.getState().logMeal({
    mealKey: activeMealType,
    optionId: option.id,
    optionName: option.name,
    kcal: option.kcal,
    loggedAt: new Date().toISOString(),
  });
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  // No navigation — stays on same screen, card updates to "Logged ✓"
};

// Edit: tapping "Edit" on a logged card re-logs with new selection
// Replaces the existing meal log entry for that mealKey
const handleEdit = (option: MealOption) => {
  useDailyLogStore.getState().editMeal(activeMealType, {
    optionId: option.id,
    optionName: option.name,
    kcal: option.kcal,
    loggedAt: new Date().toISOString(),
  });
};
```

---

## MealOptionCard component

```tsx
// components/meals/MealOptionCard.tsx

interface MealOptionCardProps {
  option: MealOption;
  isLogged: boolean;        // this specific option is today's logged choice
  isMealLogged: boolean;    // any option for this meal type is logged
  onLog: (option: MealOption) => void;
  onPress: (option: MealOption) => void;  // opens detail sheet
  onEdit: (option: MealOption) => void;
}

// Visual states:

// State 1 — Default (not logged)
// Badge: gray border + gray letter
// Card: white bg, gray border
// Right: kcal + outlined "Log" button

// State 2 — This option is logged
// Badge: filled #1D6F42 + white checkmark
// Card: #F5FBF7 bg + 3px green left border
// Right: kcal + "Logged ✓" green text + "Edit" 10px gray below

// State 3 — Different option is logged (this one not selected)
// Badge: gray, slightly muted
// Card: white, slightly muted opacity 0.7
// Right: kcal + outlined "Log" button (can switch)

// Special: E option with 'cheat' tag
// Card: #FFFCF5 bg, amber border
// Badge: amber bg + white E
// Button: "Avoid" in amber, no fill
```

---

## CalorieSummaryBar component

```tsx
// components/meals/CalorieSummaryBar.tsx

interface CalorieSummaryBarProps {
  loggedKcal: number;
  targetKcal: number;
}

// Progress bar: 120px wide, 6px height, rounded ends
// Fill: min(loggedKcal / targetKcal, 1) * 120
// Color: green normally, amber if within 100kcal of target, green again if >= target

// When at target: show subtle success state
// "Target reached!" replaces the kcal fraction text in green
```

---

## MealDetailSheet

```tsx
// components/meals/MealDetailSheet.tsx
// @gorhom/bottom-sheet, snapPoints: ['80%']

interface MealDetailSheetProps {
  option: MealOption;
  mealKey: MealType;
  isLogged: boolean;
  onLog: () => void;
  onClose: () => void;
}

// Sections:
// 1. Header — name (Fraunces 24px) + kcal + prep time + tags
// 2. "What's in it" — ingredient list with green bullet dots
// 3. "Why it works" — 3 benefit rows with checkmark icons
// 4. "Best for" — short contextual note (weekday/weekend, time pressure etc)
// 5. CTA button — "Log this for {mealLabel}" or "Logged today ✓"

// The meal data (items, benefits, bestFor) comes from plan.meals[mealKey]
// All AI-generated — don't hardcode these strings
```

---

## WeeklyMealsScreen

```tsx
// screens/main/WeeklyMealsScreen.tsx

// Shows Mon–Sun of current week
// Each day row:
//   - Day name + date (Mon 17)
//   - Day score pill (green >= 80%, amber 60-79%, red < 60%)
//   - 5 meal status pills: Bfst / Snack / Lunch / Eve / Dinner
//     - Logged: green filled
//     - Missed: red tinted
//     - Future: gray

// Summary card at bottom:
//   - Days tracked this week
//   - Average kcal/day
//   - Best day (highest score)
//   - Worst day (lowest score, only shown if < 70%)

// Data source: weeklyHistory from dailyLogStore
// Current day shows live data from today's log
```

---

## usePlanStore additions for this flow

```ts
// Add to stores/planStore.ts

// Get AI-recommended default option for a meal type
// Returns the option with isDefault: true, or first option if none flagged
getDefaultOption: (mealKey: MealType): MealOption => {
  const options = get().plan.meals[mealKey];
  return options.find(o => o.isDefault) ?? options[0];
};

// Get all options for a meal type
getMealOptions: (mealKey: MealType): MealOption[] => {
  return get().plan?.meals[mealKey] ?? [];
};
```

---

## useDailyLogStore additions for this flow

```ts
// Add to stores/dailyLogStore.ts

// Edit an already-logged meal (replace the entry)
editMeal: (mealKey: string, update: Partial<MealLogEntry>) => {
  set(state => ({
    today: {
      ...state.today,
      meals: state.today.meals.map(m =>
        m.mealKey === mealKey ? { ...m, ...update } : m
      ),
      totalKcal: state.today.meals
        .map(m => m.mealKey === mealKey ? (update.kcal ?? m.kcal) : m.kcal)
        .reduce((a, b) => a + b, 0),
    }
  }));
},

// Get logged option for a specific meal type today
getLoggedMeal: (mealKey: string): MealLogEntry | undefined => {
  return get().today.meals.find(m => m.mealKey === mealKey);
},
```

---

## Key UX rules

1. Tab **auto-selects** the most relevant meal based on time of day on screen focus
2. Tapping the **"Log" button** on a card logs inline — no sheet, no navigation
3. Tapping **anywhere else** on the card opens the detail sheet
4. Once a meal is logged, the card **stays editable** — tap "Edit" to switch options
5. The **"E" option** (cheat/avoid) is always visually distinct — amber, not green
6. The **calorie bar** updates in real time as meals are logged
7. The **"This week" view** is read-only for past days, live for today
8. AI-recommended option (**isDefault: true**) gets a subtle indicator — not intrusive
9. All meal content comes from `planStore` — never hardcoded in components
10. If plan is not loaded, show skeleton loaders with correct card dimensions

---

## File structure

```
src/
├── screens/main/
│   ├── MealsScreen.tsx
│   └── WeeklyMealsScreen.tsx
├── components/meals/
│   ├── MealTabBar.tsx
│   ├── MealOptionCard.tsx
│   ├── CalorieSummaryBar.tsx
│   ├── MealDetailSheet.tsx
│   └── DefaultPlanNote.tsx
└── data/
    └── mockMealsState.ts   ← see FLOW_03_MOCK_DATA.md
```