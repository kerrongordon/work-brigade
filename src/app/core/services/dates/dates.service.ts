import { Injectable } from '@angular/core';
import { months, Month } from 'src/app/export/months';
import { Day, days } from 'src/app/export/days';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private months: Month[] = months;
  private days: Day[] = days;

  constructor() { }

  getMonthName() {
    return [...this.months.map(month => month.name)];
  }

  getMonthAbbreviation() {
    return [...this.months.map(month => month.abbreviation)];
  }

  getDayName() {
    return [...this.days.map(day => day.name)];
  }

  getDayAbbreviation() {
    return [...this.days.map(day => day.abbreviation)];
  }

}
