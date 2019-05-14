import { Injectable } from '@angular/core';
import { months, days } from '@brigade-core/items';
import { Item } from '@brigade-core/models';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private months: Item[] = months;
  private days: Item[] = days;

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
