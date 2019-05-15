import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@brigade-core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _angularFirestore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth
  ) {  }


  async signInWithEmailAndPassword(email: string, password: string) {
    return await this._angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }


  async createUserWithEmailAndPassword(email: string, password: string) {
   return await this._angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async addUserToTheDatabase(data: User) {
    return await this._angularFirestore.collection<User>('users').add(data);
  }

  getUserById(id: string) {
    return this._angularFirestore.doc<User>(`users/${id}`);
  }

  async getUserUidInCollecttion(uid: string) {
    return await this._angularFirestore.collection<User>('users', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  async signOutUser() {
    return await this._angularFireAuth.auth.signOut();
  }

}
