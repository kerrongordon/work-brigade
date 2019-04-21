import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  itemValue = new Subject<firebase.User>();

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
  ) {
    this.getState();
   }

  getState() {
    return this.afAuth.authState.subscribe( state => {
      this.itemValue.next(state);
      return localStorage.setItem('userdata', JSON.stringify(state));
    });
  }

  getUserData(): firebase.User {
    return JSON.parse(localStorage.getItem('userdata'));
  }

  logIn() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(log => this.navCtrl.navigateRoot('home'));
  }

  logOut() {
    return this.afAuth.auth.signOut()
      .then(log => this.navCtrl.navigateRoot('login'))
      .then(log => this.getState().unsubscribe());
  }
}
