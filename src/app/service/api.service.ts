import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Monthly } from '../interface/monthly';
import { Daily } from '../interface/daily';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) {}

  addMonthlyReport(data: Monthly) {
    return this.afs.collection<Monthly>('Monthly').add(data);
  }

  addDailyReport(data: Daily) {
    return this.afs.collection<Daily>('Daily').add(data);
  }

  getListOfDailyReport(Id: String) {
    return this.afs.collection<Daily>('Daily', ref =>
      ref.where('id', '==', Id).orderBy('timestamp', 'asc')
    );
  }

  getListOfMonthlyReportForDashBoard(month: String, Year: number) {
    return this.afs.collection<Monthly>('Monthly', ref =>
      ref.where('Month', '==', month).where('Year', '==', Year).orderBy('timestamp', 'asc')
    );
  }

  getOneMonthlyReport(Id: String) {
    return this.afs.doc<Monthly>(`Monthly/${Id}`);
  }

  deleteDailyReport(id: String) {
    return this.afs.doc<Daily>(`Daily/${id}`).delete();
  }

  deleteMonthlyReport(id: String) {
    return this.afs.doc<Monthly>(`Monthly/${id}`).delete();
  }

  yearsList(startYear: number) {
    const currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 2000;
    while ( startYear <= currentYear ) { years.push(startYear++); }
    return years;
  }
}
