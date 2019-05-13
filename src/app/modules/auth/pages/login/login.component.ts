import { Subscription } from 'rxjs/internal/Subscription';
import { Storage } from '@ionic/storage';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@brigade-core/services';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { User } from '@brigade-core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  email: '' | null;
  password: '' | null;
  LoadingAnimation: HTMLIonLoadingElement;
  userSubData: Subscription;

  constructor(
    private _storage: Storage,
    private _authService: AuthService,
    private _navController: NavController,
    private _toastController: ToastController,
    private _loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.presentLoadingAnimation();
  }

  async login() {
    await this.LoadingAnimation.present();
    return await this._authService.signInWithEmailAndPassword(this.email, this.password)
      .then((data) => this.canSignin(data))
      .catch(error => { this.messageToast(error.message); this.LoadingAnimation.dismiss(); });
  }

  async canSignin(data: firebase.auth.UserCredential) {
    await this.getUserIdFormDatabase(data);
    return await this._navController.navigateRoot('beneficiary')
      .then(() => this.LoadingAnimation.dismiss());
  }

  async messageToast(message: string) {
    const toast = await this._toastController.create({ message: message, duration: 5000 });
    return await toast.present();
  }

  async presentLoadingAnimation() {
    return this.LoadingAnimation = await this._loadingController.create({ message: 'Signing In...' });
  }

  private async getUserIdFormDatabase(auth: firebase.auth.UserCredential) {
    const { uid } = await auth.user;
    return await this._authService.getUserUidInCollecttion(uid)
      .then(data => this.userSubData = data.subscribe(sub => this.addUserIdToLocalStorage(sub)));
  }

  private async addUserIdToLocalStorage(data: User[]) {
    return await this._storage.set('user', data[0])
      .then(() => this.userSubData.unsubscribe());
  }

}
