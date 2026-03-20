import { TimelineItem } from '../types/log';

export const mockHomeState = {
  user: {
    name: 'Rahul',
    goalWeightKg: 66,
    currentWeightKg: 72,
    startWeightKg: 74,
    startDate: '2026-02-28',
  },

  streak: 12,

  calorieTargets: {
    total: 1810,
    breakfast: 480,
    morningSnack: 130,
    lunch: 580,
    eveningSnack: 130,
    dinner: 490,
  },

  todayRoutine: [
    {
      time: '06:45',
      label: 'Morning drink',
      type: 'habit',
      habitKey: 'morningDrink',
      description: 'Ajwain-saunf water with ginger + lime',
    },
    {
      time: '07:00',
      label: 'Breakfast',
      type: 'meal',
      mealKey: 'breakfast',
      description: 'See your 5 options',
    },
    {
      time: '10:30',
      label: 'Morning snack',
      type: 'meal',
      mealKey: 'morningSnack',
      description: 'Carry in your bag',
    },
    {
      time: '13:00',
      label: 'Lunch',
      type: 'meal',
      mealKey: 'lunch',
      description: 'Biggest meal of the day',
    },
    {
      time: '16:30',
      label: 'Evening snack',
      type: 'meal',
      mealKey: 'eveningSnack',
      description: 'Before your black coffee',
    },
    {
      time: '22:15',
      label: 'Dinner',
      type: 'meal',
      mealKey: 'dinner',
      description: 'Lighter than lunch',
    },
    {
      time: '22:30',
      label: 'Evening walk',
      type: 'habit',
      habitKey: 'eveningWalk',
      description: '5–10 min slow walk',
    },
    {
      time: '23:00',
      label: 'Sleep',
      type: 'habit',
      habitKey: 'sleep',
      description: 'Target 11 PM',
    },
  ] as TimelineItem[],

  weekScores: [72, 85, 91, 68, 88, 75, 0],

  milestones: [
    { weightKg: 72, label: 'First 2 kg!',     weeksEstimate: 3,  reached: true  },
    { weightKg: 70, label: 'Under 70 kg',      weeksEstimate: 7,  reached: false },
    { weightKg: 68, label: 'Halfway there',    weeksEstimate: 11, reached: false },
    { weightKg: 66, label: 'Almost at goal',   weeksEstimate: 15, reached: false },
    { weightKg: 65, label: 'Goal reached!',    weeksEstimate: 17, reached: false },
  ],
};
