import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '@brigade-core/models';
import { constituencies } from '@brigade-core/items';
import { AuthService, ThemeService } from '@brigade-core/services';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  id: string;
  sex: string;
  uid: string;
  name: string;
  theme: string;
  email: string;
  timestamp: string;
  themeUpdate: string;
  constituency: string;

  themeBoolean = false;
  constituencies = constituencies;
  themeDarkOrLight: string;
  pageType: string;
  // pageType: boolean;

  constructor(
    private _storage: Storage,
    private _authService: AuthService,
    private _themeService: ThemeService,
    private _navController: NavController,
    private _activatedRoute: ActivatedRoute,
    private _toastController: ToastController,
  ) { }

  ngOnInit() {
    this.getPageType();
    this.loadData();
  }

  async getPageType() {
    this.pageType = await this._activatedRoute.snapshot.paramMap.get('type');
    // return pageType === 'isnewuser' ? this.pageType = true : this.pageType = false;
  }

  async loadData() {
    return this._storage.get('user')
      .then((data) => {
        this.themeBoolean = data.theme === 'light' ? false : true;
        this.id = data.id;
        this.sex = data.sex;
        this.uid = data.uid;
        this.name = data.name;
        this.theme = data.theme;
        this.email = data.email;
        this.timestamp = data.timestamp;
        this.constituency = data.constituency;
      })
      .then(() => this.updatTheme());

  }

  updatTheme() {
    this.themeDarkOrLight = this.themeBoolean ? 'dark' : 'light';
    return this._themeService.setTheme(this.themeDarkOrLight);
  }

  async upDateDatabase() {

    if (
      this.name.trim() === '' ||
      this.sex.trim() === '' ||
      this.constituency.trim() === ''
    ) {
      return this.messageToast('Please Full Out The Form');
    }

    const data: User = await {
      id: this.id,
      sex: this.sex,
      uid: this.uid,
      name: this.name,
      theme: this.themeDarkOrLight,
      email: this.email,
      timestamp: this.timestamp,
      constituency: this.constituency
    };

    await this._authService.getUserById(this.id).update(data)
      .then(() => this._storage.set('user', data));

    return this.changeRoute();
  }

  async changeRoute() {
    if (this.pageType === 'isnewuser') {
      return this._navController.navigateRoot('beneficiary/list');
    }

    if (this.pageType === 'edit') {
      return this._navController.back();
    }
  }

  async messageToast(message: string) {
    const toast = await this._toastController.create({ message: message, duration: 5000 });
    return await toast.present();
  }

  goBack() {
    return this._navController.back();
  }

}
