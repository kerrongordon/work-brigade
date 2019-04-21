import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Beneficiary } from '../export/beneficiary';


@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {


  constructor(
    private afs: AngularFirestore,
  ) {  }

  registerBeneficiary(data) {
    return this.afs.collection<Beneficiary>('Beneficiary').add(data);
  }

  loadBeneficiary() {
    const useid: firebase.User = JSON.parse(localStorage.getItem('userdata'));
    return this.afs.collection<Beneficiary>('Beneficiary', ref => {
      return ref.orderBy('startDate').where('userUuid', '==', useid.uid);
    }).snapshotChanges()
    .pipe(map(arr => arr.map(snap => ( { $key: snap.payload.doc.id, ...snap.payload.doc.data() } ))));
  }

  loadBeneficiaryById(id: string) {
    return this.afs.doc<Beneficiary>(`Beneficiary/${id}`);
  }
}
