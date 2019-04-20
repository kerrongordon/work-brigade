import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Daily } from '../export/daily';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyService {

  constructor(private afs: AngularFirestore) { }

  addDailyReport(data: Daily) {
    return this.afs.collection<Daily>('dailyReport').add(data);
  }

  loadDailyReport(id: string) {
    return this.afs.collection<Daily>('dailyReport', ref => {
      return ref.orderBy('date').where('monthId', '==', id);
    }).snapshotChanges()
      .pipe(map(arr => arr.map(snap => ({ $key: snap.payload.doc.id, ...snap.payload.doc.data() }))));
  }

  loadDailyById(id: string) {
    return this.afs.doc<Daily>(`dailyReport/${id}`);
  }
}
