export const days: Day[] = [
  { abbreviation: 'mon', name: 'Monday' },
  { abbreviation: 'tue', name: 'Tuesday' },
  { abbreviation: 'wed', name: 'Wednesday' },
  { abbreviation: 'thu', name: 'Thursday' },
  { abbreviation: 'fri', name: 'Friday' },
  { abbreviation: 'sat', name: 'Saturday' },
  { abbreviation: 'sun', name: 'Sunday' }
];

export interface Day {
  abbreviation: string;
  name: string;
}
