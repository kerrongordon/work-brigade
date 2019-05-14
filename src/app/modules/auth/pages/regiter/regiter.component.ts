import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@brigade-core/services';
import { User } from '@brigade-core/models';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegiterComponent implements OnInit {

  email: '' | null;
  password: '' | null;
  cpassword: '' | null;
  LoadingAnimation: HTMLIonLoadingElement;

  constructor(
    private _authService: AuthService,
    private _navController: NavController,
    private _toastController: ToastController,
    private _loadingController: LoadingController,
  ) { }

  ngOnInit() {}

  async register() {
    this.presentLoadingAnimation('Signing Up As New User...');
    return await this._authService.createUserWithEmailAndPassword(this.email, this.password)
      .then(data => this.findOutIfItIsANewUser(data))
      .catch(error => { this.messageToast(error.message); this.LoadingAnimation.dismiss(); });
  }

  private async findOutIfItIsANewUser(user: firebase.auth.UserCredential) {
    const { isNewUser } = user.additionalUserInfo;
    isNewUser ? this.addUserToTheDatabase(user) : this.login();
  }

  private async addUserToTheDatabase(fuser: firebase.auth.UserCredential) {
    const { user } = await fuser;
    const timestamp = await new Date(Date.now()).toString();
    const data: User = await {
      id: '',
      uid: user.uid,
      sex: '',
      name: '',
      email: user.email,
      theme: 'light',
      timestamp: timestamp,
      constituency: '',
    };
    return await this._authService.addUserToTheDatabase(data)
      .then(doc => this.addUserIdToDabase(doc));
  }

  private async login() {
    await this.presentLoadingAnimation('Signing In...');
    return this._authService.signInWithEmailAndPassword(this.email, this.password)
      .then(() => this.LoadingAnimation.dismiss())
      .then(() => this._navController.navigateRoot(['form/settings', 'isnewuser']))
      .then(() => { this.email = ''; this.password = ''; })
      .catch(error => this.messageToast(error.message));
  }

  private async addUserIdToDabase(doc: firebase.firestore.DocumentReference) {
    return await this._authService.getUserById(doc.id).update({id: doc.id})
      .then(() => this.LoadingAnimation.dismiss())
      .then(() => this.login());
  }

  private async messageToast(message: string) {
    const toast = await this._toastController.create({ message, duration: 5000 });
    return await toast.present();
  }

  private async presentLoadingAnimation(message: string) {
    this.LoadingAnimation = await this._loadingController.create({ message });
    return this.LoadingAnimation.present();
  }

}
