import { Storage } from '@ionic/storage';
import { User } from './../../export/user';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/service/auth.service';
import { ThemeService } from 'src/app/service/theme.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { constituencies } from 'src/app/export/constituencies';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  id: string;
  sex: string;
  name: string;
  theme: string;
  email: string;
  timestamp: string;
  themeUpdate: string;
  constituency: string;
  themeBoolean: boolean;
  getUserAccountSub: Subscription;
  constituencies = constituencies;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.getUserAccount();
  }


  // NOTE Get user Account Information
  async getUserAccount() {
    return await this.storage.get('userdata').then( val => {
      return this.getUserAccountSub = this.authService.getUserDataWithUid(val).subscribe(data => {
        this.id = data[0].id;
        this.sex = data[0].sex;
        this.name = data[0].name;
        this.theme = data[0].theme;
        this.email = data[0].email;
        this.timestamp = data[0].timestamp;
        this.constituency = data[0].constituency;
        this.themeToggle()
          .then(() => this.changeTheme());
      });
    });
  }


  // NOTE Get Theme Form Database
  async themeToggle() {
    return this.themeBoolean = await this.theme === 'light' ? false : true;
  }


  // NOTE Update user Database Information
  upDateDatabase() {
    if (this.themeBoolean === false) {
      this.themeUpdate = 'light';
    } else {
      this.themeUpdate = 'dark';
    }

    const infor: User = {
      'email': this.email,
      'sex': this.sex || '',
      'name': this.name || '',
      'theme': this.themeUpdate,
      'constituency': this.constituency || '',
    };
    this.authService.getUserById(this.id).update(infor);
    return this.navCtrl.back();
  }


  // NOTE Go Back a Page
  goBack() {
    return this.navCtrl.back();
  }


  // NOTE Change theme
  changeTheme() {
    return this.themeService.setTheme(this.theme);
  }


  // NOTE  Clean up
  ngOnDestroy() {
    this.getUserAccountSub.unsubscribe();
  }

}
