export interface WeightEntry {
  date: string;        // 'YYYY-MM-DD'
  weightKg: number;
}

export interface WeightMilestone {
  weightKg: number;
  label: string;
  weeksEstimate: number;
  reached: boolean;
  isCurrent: boolean;  // just reached this session
}

export interface LogRow {
  date: string;
  weightKg: number;
  changePill: {
    text: string;
    color: 'green' | 'red' | 'gray';
  };
}
