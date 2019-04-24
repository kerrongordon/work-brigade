import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Beneficiary } from '../export/beneficiary';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  // NOTE Load all Beneficiary
  LoadAllBeneficiary(uid: string): Observable<Beneficiary[]> {
    return this.afs.collection<Beneficiary>('Beneficiary', ref =>
      ref.orderBy('startDate').where('uid', '==', uid)
      ).snapshotChanges()
      .pipe(map(arr => arr.map(snap => ( { ...snap.payload.doc.data() } ))));
  }


  // NOTE Register Beneficiary
  async registerBeneficiary(data: Beneficiary) {
    return await this.afs.collection<Beneficiary>('Beneficiary').add(data)
      .then(infor => this.addBeneficiaryIdToDatabase(infor));
  }


  // NOTE Add Beneficiary Id To Database
  private async addBeneficiaryIdToDatabase(data: firebase.firestore.DocumentReference) {
    return await this.loadBeneficiaryById(data.id).update({id: data.id});
  }


  // NOTE Load Beneficiary By Id
  loadBeneficiaryById(id: string) {
    return this.afs.doc<Beneficiary>(`Beneficiary/${id}`);
  }
}
