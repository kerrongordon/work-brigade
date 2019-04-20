export const days: Day[] = [
  { abbreviation: 'sun', name: 'Sunday' },
  { abbreviation: 'mon', name: 'Monday' },
  { abbreviation: 'tue', name: 'Tuesday' },
  { abbreviation: 'wed', name: 'Wednesday' },
  { abbreviation: 'thu', name: 'Thursday' },
  { abbreviation: 'fri', name: 'Friday' },
  { abbreviation: 'sat', name: 'Saturday' },
];

export interface Day {
  abbreviation: string;
  name: string;
}
