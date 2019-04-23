import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs/internal/Subject';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../export/user';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  itemValue = new Subject<firebase.User>();
  loading: HTMLIonLoadingElement;

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public toastController: ToastController,
    private afs: AngularFirestore,
    public loadingController: LoadingController
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

  async logIn(email: string, password: string) {
    this.presentLoading('Signing In...');
      try {
        await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        await this.loading.dismiss();
        return this.navCtrl.navigateRoot('home');
      } catch (error) {
        await this.loading.dismiss();
        return this.presentToast(error.message);
      }
  }

  async register(email: string, password: string) {
    this.presentLoading('Registing...');
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(async data => {
          const user =  {
            uuid: data.user.uid,
            email: data.user.email
           };
          await this.afs.collection<User>('users').add(user);
          await this.loading.dismiss();
          return this.logIn(email, password).then(() => this.navCtrl.navigateForward('settings'));
        });
    } catch (error) {
      await this.loading.dismiss();
      return this.presentToast(error.message);
    }
  }

  logOut() {
    return this.afAuth.auth.signOut()
      .then(log => this.navCtrl.navigateRoot('login'))
      .then(log => this.getState().unsubscribe());
  }

  getUserById(id: string) {
    return this.afs.doc<User>(`users/${id}`);
  }

  getUserKey(id) {
    return this.afs.collection<User>('users', ref =>
      ref.where('uuid', '==', id)
    ).snapshotChanges()
    .pipe(map( arr => arr.map(snap => ({$key: snap.payload.doc.id, data: snap.payload.doc.data() }) )));
  }

  async presentToast(mess: string) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 5000
    });
    toast.present();
  }

  async presentLoading(mess: string) {
    this.loading = await this.loadingController.create({
      message: mess,
    });
    this.loading.present();
  }

}
