import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Report } from '@brigade-core/models';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private afs: AngularFirestore
  ) { }

  loadUserReport(uid: string) {
    return this.afs.collection<Report>('Report', ref =>
    ref.orderBy('startDate', 'desc').where('uid', '==', uid) ).valueChanges();
  }

  async addNewReport(data: Report) {
    return await this.afs.collection<Report>('Report').add(data)
      .then(infor => this.addNewRepotIdToDatabase(infor));
  }

  private async addNewRepotIdToDatabase(infor: firebase.firestore.DocumentReference) {
    return this.loadReportById(infor.id).update({id: infor.id});
  }

  loadReportById(id: string) {
    return this.afs.doc<Report>(`Report/${id}`);
  }
}
