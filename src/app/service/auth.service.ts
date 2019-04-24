import { auth } from 'firebase/app';
import { User } from '../export/user';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loading: HTMLIonLoadingElement;

  constructor(
    private storage: Storage,
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }


  // NOTE Get User By Id
  getUserById(id: string) {
    return this.afs.doc<User>(`users/${id}`);
  }


  // NOTE error on Sign In and Register..
  async signInRegisterError(error) {
    return await this.loading.dismiss()
    .then(() => this.notifiToast(error));
  }


  // NOTE Notification on Sign In or Register
  async notifiToast(mess: string) {
    const toast = await this.toastController.create({ message: mess, duration: 5000});
    return toast.present();
  }


  // NOTE Loading animation with Messages
  async loadingMess(mess: string) {
    this.loading = await this.loadingController.create({ message: mess});
    return this.loading.present();
  }


  // NOTE User Sign Out..
  async userSignOut() {
    return await this.afAuth.auth.signOut()
      .then(() => this.navCtrl.navigateRoot('login'))
      .then(() => this.storage.set('islogin', false));
  }


  // NOTE User Sign In...
  async userSignIn(email: string, password: string) {
    this.loadingMess('Signing In...');
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(() => this.storage.set('islogin', true))
        .then(() => this.navCtrl.navigateRoot('home'))
        .then(() => this.loading.dismiss());
    } catch (error) {
      return this.signInRegisterError(error);
    }
  }


  // NOTE User Registion...
  async userRegister(email: string, password: string) {
    this.loadingMess('Registing...');
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(data => this.createUserDatabse(data))
        .then(() => this.userSignIn(email, password))
        .then(() => this.navCtrl.navigateForward('settings'));
    } catch (error) {
      return this.signInRegisterError(error);
    }
  }


  // NOTE create user database from Register
  async createUserDatabse(data: auth.UserCredential) {
    const { user } = await data;
    const infor: User = {
      uid: user.uid,
      email: user.email,
      timestamp: new Date(Date.now()).toString(),
      constituency: '',
      sex: '',
      theme: 'light'
    };
    return this.afs.collection<User>('users').add(infor)
      .then( getId => this.getUserById(getId.id).update({id: getId.id}))
      .then(() => this.loading.dismiss());
  }

}
