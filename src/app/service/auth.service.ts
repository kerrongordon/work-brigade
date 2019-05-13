import { auth } from 'firebase/app';
import { User } from '../export/user';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';

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
  ) {  }

  // NOTE Get all Users
  getUserDataWithUid(id: string) {
    return this.afs.collection<User>('users', ref => ref.where('uid', '==', id) ).snapshotChanges()
      .pipe(map(arr => arr.map(snap => ({ ...snap.payload.doc.data() }) )));
  }

  // NOTE Get User By Id
  getUserById(id: string) {
    return this.afs.doc<User>(`users/${id}`);
  }


  // NOTE error on Sign In and Register..
  private async signInRegisterError(error) {
    return await this.loading.dismiss()
    .then(() => this.notifiToast(error));
  }


  // NOTE Notification on Sign In or Register
  private async notifiToast(mess: string) {
    const toast = await this.toastController.create({ message: mess, duration: 5000});
    return toast.present();
  }


  // NOTE Loading animation with Messages
  private async loadingMess(mess: string) {
    this.loading = await this.loadingController.create({ message: mess});
    return this.loading.present();
  }


  // NOTE User Sign Out..
  async userSignOut() {
    return await this.afAuth.auth.signOut()
      .then(() => this.navCtrl.navigateRoot('login'))
      .then(() => this.storage.set('islogin', false))
      .then(() => this.storage.set('userdata', ''));
  }


  // NOTE User Sign In...
  async userSignIn(email: string, password: string) {
    this.loadingMess('Signing In...');
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => this.addUserIdToLocalStorage(data))
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


  async sendPasswordResetEmail(email: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(email);
  }


  // NOTE create user database from Register
  private async createUserDatabse(data: auth.UserCredential) {
    const { user } = await data;
    const infor: User = {
      uid: user.uid,
      email: user.email,
      timestamp: new Date(Date.now()).toString(),
      constituency: '',
      sex: '',
      theme: 'light',
      name: ''
    };
    return this.afs.collection<User>('users').add(infor)
      .then( getId => this.addUserIdToDabase(getId))
      .then(() => this.loading.dismiss());
  }


  // NOTE Add User to Database and Set the ID
  private async addUserIdToDabase(doc: firebase.firestore.DocumentReference) {
    return await this.getUserById(doc.id).update({id: doc.id});
  }

  // NOTE On Sign In add User Uid to LocalStorage
  private async addUserIdToLocalStorage(data: auth.UserCredential) {
    await this.storage.set('userdata', data.user.uid);
    return this.storage.set('islogin', true);
  }

}
