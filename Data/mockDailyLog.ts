import { DailyLog } from '../types/log';

export const mockDailyLog: DailyLog = {
  date: '2026-03-21',
  meals: [
    {
      mealKey: 'breakfast',
      optionId: 'b1',
      optionName: 'Eggs + bread + banana',
      kcal: 480,
      loggedAt: '2026-03-21T07:05:00Z',
    },
    {
      mealKey: 'morningSnack',
      optionId: 's1',
      optionName: 'Roasted chana',
      kcal: 120,
      loggedAt: '2026-03-21T10:38:00Z',
    },
  ],
  habits: [
    {
      habitKey: 'morningDrink',
      status: 'done',
      loggedAt: '2026-03-21T06:47:00Z',
    },
  ],
  completedItems: ['06:45', '07:00', '10:30'],
  totalKcal: 600,
  dayScore: 0,
};

export const mockDailyLogMorning: DailyLog = {
  date: '2026-03-21',
  meals: [],
  habits: [],
  completedItems: [],
  totalKcal: 0,
  dayScore: 0,
};

export const mockDailyLogEvening: DailyLog = {
  date: '2026-03-21',
  meals: [
    { mealKey: 'breakfast',     optionId: 'b1', optionName: 'Eggs + bread', kcal: 480, loggedAt: '2026-03-21T07:02:00Z' },
    { mealKey: 'morningSnack',  optionId: 's2', optionName: 'Banana',       kcal: 90,  loggedAt: '2026-03-21T10:30:00Z' },
    { mealKey: 'lunch',         optionId: 'l1', optionName: 'Dal + roti',   kcal: 580, loggedAt: '2026-03-21T13:10:00Z' },
    { mealKey: 'eveningSnack',  optionId: 'es2',optionName: 'Nuts + coffee',kcal: 150, loggedAt: '2026-03-21T16:35:00Z' },
  ],
  habits: [
    { habitKey: 'morningDrink', status: 'done', loggedAt: '2026-03-21T06:47:00Z' },
  ],
  completedItems: ['06:45', '07:00', '10:30', '13:00', '16:30'],
  totalKcal: 1300,
  dayScore: 0,
};

export const mockDailyLogComplete: DailyLog = {
  date: '2026-03-21',
  meals: [
    { mealKey: 'breakfast',     optionId: 'b1', optionName: 'Eggs + bread', kcal: 480, loggedAt: '2026-03-21T07:02:00Z' },
    { mealKey: 'morningSnack',  optionId: 's1', optionName: 'Roasted chana',kcal: 120, loggedAt: '2026-03-21T10:30:00Z' },
    { mealKey: 'lunch',         optionId: 'l2', optionName: 'Chicken roti', kcal: 600, loggedAt: '2026-03-21T13:15:00Z' },
    { mealKey: 'eveningSnack',  optionId: 'es1',optionName: 'Chana',        kcal: 120, loggedAt: '2026-03-21T16:30:00Z' },
    { mealKey: 'dinner',        optionId: 'd1', optionName: 'Roti + sabji', kcal: 480, loggedAt: '2026-03-21T22:20:00Z' },
  ],
  habits: [
    { habitKey: 'morningDrink', status: 'done',    loggedAt: '2026-03-21T06:47:00Z' },
    { habitKey: 'eveningWalk',  status: 'done',    loggedAt: '2026-03-21T22:35:00Z' },
    { habitKey: 'sleep',        status: 'upcoming', loggedAt: '' },
  ],
  completedItems: ['06:45', '07:00', '10:30', '13:00', '16:30', '22:15', '22:30'],
  totalKcal: 1800,
  dayScore: 88,
};
