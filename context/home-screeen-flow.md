# Flow 02 — Home / Today Dashboard

## Overview
The Home tab is the daily command centre. It shows the user's routine
for today, lets them log meals and habits inline, displays calorie
progress, and surfaces their streak. It is the screen the user opens
every morning and checks multiple times a day.

**Navigator:** Bottom Tab — `HomeStack`
**Screens in this flow:** 7 (5 screens + 2 bottom sheets + 1 modal)
**Stores used:** `useDailyLogStore`, `usePlanStore`, `useUserStore`, `useWeightLogStore`

---

## Screen inventory

| File | Description | Type |
|------|-------------|------|
| `screens/main/HomeScreen.tsx` | Main today dashboard | Tab screen |
| `screens/main/SettingsScreen.tsx` | App settings | Stack screen |
| `components/sheets/MealLogSheet.tsx` | Log a meal | Bottom sheet |
| `components/sheets/HabitLogSheet.tsx` | Log a habit / morning drink | Bottom sheet |
| `components/modals/MilestoneModal.tsx` | Milestone celebration | Modal overlay |
| `components/home/TimelineItem.tsx` | Single routine row | Component |
| `components/home/ProgressCard.tsx` | Calorie ring + stats | Component |
| `components/home/StreakBanner.tsx` | Streak flame banner | Component |

---

## Navigation

```
MainTabs (Bottom Tab Navigator)
  └─ Home (Stack)
       ├─ HomeScreen                    ← default
       │    ├─ tap timeline item        → MealLogSheet (bottom sheet)
       │    ├─ tap habit item           → HabitLogSheet (bottom sheet)
       │    ├─ tap FAB "+"              → MealLogSheet (nearest upcoming meal)
       │    ├─ tap gear icon            → SettingsScreen
       │    └─ weight log triggers      → MilestoneModal (auto, if milestone hit)
       └─ SettingsScreen
            └─ "Regenerate plan"        → OnboardingStack (IntakeBasic, pre-filled)
```

---

## HomeScreen

### Header section
```tsx
// Green header — #1D6F42 background
// Row 1: App name + settings
<View style={styles.headerTop}>
  <Text style={styles.appName}>Niyam</Text>         // Fraunces 700, 20px, white
  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
    <Ionicons name="settings-outline" size={22} color="white" />
  </TouchableOpacity>
</View>

// Row 2: Greeting — changes by time of day
const greeting = getGreeting(); // see utils below
<Text style={styles.greeting}>{greeting}, {user.name}</Text>  // DM Sans 600, 24px, white

// Row 3: Progress summary
<Text style={styles.progressSummary}>
  {dayOfWeek} · {completedCount} of {totalCount} done
</Text>  // DM Sans 400, 13px, white 70% opacity
```

**Greeting logic:**
```ts
// utils/greeting.ts
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
};
```

### Progress card (overlapping header)
```tsx
// Floats up into the green header via negative marginTop
<View style={styles.progressCard}>
  <View style={styles.progressLeft}>
    <Text style={styles.progressLabel}>TODAY'S CALORIES</Text>
    <Text style={styles.progressKcal}>
      <Text style={styles.kcalLogged}>{loggedKcal}</Text>
      <Text style={styles.kcalTotal}> / {plan.calorieTargets.total} kcal</Text>
    </Text>
  </View>
  <CircularProgress
    value={percentage}          // 0–100
    radius={36}
    activeStrokeColor="#1D6F42"
    inActiveStrokeColor="#E8F5EE"
    activeStrokeWidth={5}
    inActiveStrokeWidth={5}
    showProgressValue={true}
    valueSuffix="%"
    // Use react-native-circular-progress-indicator
  />
</View>
```

### Streak banner
```tsx
// Only show if streak >= 3
{streak >= 3 && (
  <View style={styles.streakBanner}>
    <Ionicons name="flame" size={14} color="#BA7517" />
    <Text style={styles.streakText}>{streak} day streak · Keep it going!</Text>
  </View>
)}
```

### Timeline list
```tsx
// Built from plan.weekdayRoutine (or weekendRoutine on weekends)
// Each item gets a computed status based on dailyLog + current time

<FlatList
  data={todayRoutine}
  renderItem={({ item }) => (
    <TimelineItem
      item={item}
      status={getItemStatus(item, dailyLog)}
      onPress={() => handleItemPress(item)}
    />
  )}
  keyExtractor={item => item.time}
/>
```

**Item status logic:**
```ts
// utils/timelineStatus.ts
export type ItemStatus = 'done' | 'overdue' | 'upcoming' | 'missed';

export const getItemStatus = (
  item: RoutineItem,
  dailyLog: DailyLog,
  now: Date = new Date()
): ItemStatus => {
  const isLogged = dailyLog.completedItems.includes(item.time);
  if (isLogged) return 'done';

  const [h, m] = item.time.split(':').map(Number);
  const itemTime = new Date();
  itemTime.setHours(h, m, 0, 0);

  const isToday = dailyLog.date === today();
  if (!isToday) return 'missed';
  if (now > itemTime) return 'overdue';
  return 'upcoming';
};
```

### FAB button
```tsx
// Floating action button — always visible above tab bar
<TouchableOpacity
  style={styles.fab}
  onPress={() => openMealLog(getNextUnloggedMeal())}
>
  <Ionicons name="add" size={28} color="white" />
</TouchableOpacity>

// Position: absolute, bottom: 80 (above tab bar), alignSelf: center
```

---

## TimelineItem component

```tsx
interface TimelineItemProps {
  item: RoutineItem;
  status: ItemStatus;
  onPress: () => void;
}

// Visual mapping
const statusConfig = {
  done:     { pillText: 'Done',     pillBg: '#E8F5EE', pillColor: '#0F6E56', leftBorder: null },
  overdue:  { pillText: 'Log now',  pillBg: '#FAEEDA', pillColor: '#633806', leftBorder: '#BA7517' },
  upcoming: { pillText: 'Upcoming', pillBg: '#F5F5F0', pillColor: '#9B9B96', leftBorder: null },
  missed:   { pillText: 'Missed',   pillBg: '#FCEBEB', pillColor: '#791F1F', leftBorder: '#E24B4A' },
};
```

**Undo gesture:** Long-pressing a "Done" item opens a small context menu with "Undo log" option. Only available for items logged today.

---

## MealLogSheet

```tsx
// Uses @gorhom/bottom-sheet
// snapPoints: ['70%']
// enablePanDownToClose: true

interface MealLogSheetProps {
  mealKey: 'breakfast' | 'morningSnack' | 'lunch' | 'eveningSnack' | 'dinner';
  onSave: (optionId: string, kcal: number) => void;
  onClose: () => void;
}
```

**Contents:**
```tsx
// Header
<Text style={styles.sheetTitle}>Log {mealLabel}</Text>  // Fraunces 700 22px
<Text style={styles.sheetSub}>Choose what you had</Text>

// Option list — from plan.meals[mealKey]
{mealOptions.map(option => (
  <MealOptionCard
    key={option.id}
    option={option}
    isSelected={selectedId === option.id}
    onPress={() => setSelectedId(option.id)}
  />
))}

// Custom entry
<TouchableOpacity style={styles.customRow}>
  <Ionicons name="pencil-outline" size={16} color="#6B6B6B" />
  <Text>Ate something else? Enter manually</Text>
</TouchableOpacity>

// Save button
<TouchableOpacity
  style={styles.saveButton}
  onPress={() => onSave(selectedId, selectedKcal)}
>
  <Text>Save — {selectedKcal} kcal</Text>
</TouchableOpacity>
```

**On save:**
```tsx
const handleMealSave = (optionId: string, kcal: number) => {
  useDailyLogStore.getState().logMeal({
    mealKey,
    optionId,
    kcal,
    loggedAt: new Date().toISOString(),
  });
  sheetRef.current?.close();
  // Haptic feedback
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
```

---

## HabitLogSheet

```tsx
// snapPoints: ['45%']
// For habits: morningDrink, eveningWalk, sleep

// Shows habit name + brief description
// Two buttons: "Skip today" (outlined) | "Mark done" (filled green)
// Skip does NOT break streak — just records as skipped
```

---

## MilestoneModal

```tsx
// Triggered automatically when weight log hits a milestone
// Check in weightLogStore after every weight entry:

const checkMilestone = (newWeight: number, milestones: Milestone[]) => {
  return milestones.find(m =>
    newWeight <= m.weightKg &&
    !completedMilestones.includes(m.weightKg)
  );
};

// If milestone found: show modal, add to completedMilestones[]
```

**Contents:**
```
- Celebratory flat illustration (confetti + star)
- "Milestone reached!" — Fraunces 28px green
- Milestone label — DM Sans 18px bold e.g. "First 2 kg lost!"
- Sub: "74 kg → 72 kg · Week 3"
- Milestone progress strip (5 dots, filled up to current)
- "Share progress" button (outlined)
- "Continue" button (filled green)
```

---

## SettingsScreen

```tsx
// Sections:
const settings = [
  {
    title: 'Profile',
    items: ['Name', 'Age', 'Height', 'Current weight'],
  },
  {
    title: 'Plan',
    items: ['View my plan', 'Regenerate plan', 'Switch to default plan'],
  },
  {
    title: 'Notifications',
    items: ['Meal reminders', 'Habit reminders', 'Weekly weight reminder'],
    type: 'toggle',
  },
  {
    title: 'App',
    items: ['Rate Niyam', 'Share app', 'Privacy policy', 'About'],
  },
];

// Danger zone at bottom
<TouchableOpacity onPress={confirmReset}>
  <Text style={{ color: '#A32D2D', textAlign: 'center' }}>Reset all data</Text>
</TouchableOpacity>
<Text style={styles.resetNote}>This will delete all your logs and plan.</Text>
```

---

## Zustand store — useDailyLogStore

```ts
// stores/dailyLogStore.ts

interface MealLog {
  mealKey: string;
  optionId: string;
  kcal: number;
  loggedAt: string;
}

interface HabitLog {
  habitKey: string;
  status: 'done' | 'skipped';
  loggedAt: string;
}

interface DailyLog {
  date: string;           // 'YYYY-MM-DD'
  meals: MealLog[];
  habits: HabitLog[];
  completedItems: string[]; // array of time strings e.g. ['07:00', '10:30']
  totalKcal: number;
  dayScore: number;       // 0–100, calculated at end of day
}

interface DailyLogStore {
  today: DailyLog;
  history: DailyLog[];    // last 90 days
  streak: number;

  logMeal: (log: MealLog) => void;
  logHabit: (log: HabitLog) => void;
  undoLog: (timeKey: string) => void;
  calculateDayScore: () => number;
  archiveDay: () => void; // called at midnight
}
```

---

## Mock data for HomeScreen

```ts
// Used while Firebase is not yet wired up
// src/data/mockDailyLog.ts

export const mockDailyLog = {
  date: '2026-03-21',
  meals: [
    { mealKey: 'breakfast', optionId: 'b1', kcal: 480, loggedAt: '2026-03-21T07:05:00Z' },
    { mealKey: 'morningSnack', optionId: 's1', kcal: 120, loggedAt: '2026-03-21T10:35:00Z' },
  ],
  habits: [
    { habitKey: 'morningDrink', status: 'done', loggedAt: '2026-03-21T06:48:00Z' },
  ],
  completedItems: ['06:45', '07:00', '10:30'],
  totalKcal: 600,
  dayScore: 0,
};

export const mockStreak = 12;
```

---

## Required packages

```bash
npm install @gorhom/bottom-sheet
npm install react-native-reanimated   # required by bottom-sheet
npm install react-native-gesture-handler
npm install react-native-circular-progress-indicator
npx expo install expo-haptics
npx expo install expo-notifications
```

---

## Key UX rules for this screen

1. **Never show an empty state** — if no plan loaded, show skeleton loaders not blank space
2. **Overdue items** always appear amber with left border — never red (keeps tone supportive not alarming)
3. **The FAB** always opens the nearest upcoming or overdue meal, not a generic picker
4. **Streak resets at midnight** only if the previous day's score was below 60%
5. **Haptic feedback** on every successful log — `Haptics.notificationAsync(Success)`
6. **Pull to refresh** on the timeline list — re-calculates statuses from current time
7. **Day score** = (completed items / total items) × 100, calculated when day is archived

---

## File structure for this flow

```
src/
├── screens/
│   └── main/
│       ├── HomeScreen.tsx
│       └── SettingsScreen.tsx
├── components/
│   ├── home/
│   │   ├── TimelineItem.tsx
│   │   ├── ProgressCard.tsx
│   │   └── StreakBanner.tsx
│   ├── sheets/
│   │   ├── MealLogSheet.tsx
│   │   └── HabitLogSheet.tsx
│   └── modals/
│       └── MilestoneModal.tsx
├── stores/
│   └── dailyLogStore.ts
├── utils/
│   ├── greeting.ts
│   ├── timelineStatus.ts
│   └── dateHelpers.ts
└── data/
    └── mockDailyLog.ts
```