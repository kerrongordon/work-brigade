import { User } from './../../export/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { constituencies } from 'src/app/export/constituencies';
import { NavController } from '@ionic/angular';
import { ThemeService } from 'src/app/service/theme.service';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  constituencies = constituencies;
  constsit: {theme: boolean};
  name = '';
  constituency = '';
  theme = false;
  fbu: firebase.User ;
  key: string;
  data: User;
  userSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private themeService: ThemeService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getSaveTheme();
    this.getUserId();
  }

  async getSaveTheme() {
    this.constsit = await JSON.parse(localStorage.getItem('theme'));
    if (this.constsit === null || this.constsit === undefined) { return; }
    this.themeService.setTheme(this.constsit.theme);
    return this.theme = this.constsit.theme;
  }

  setTheme() {
    const { theme } = this;
    return localStorage.setItem('theme', JSON.stringify({ theme }));
  }

  async getUserId() {
    this.fbu = await JSON.parse(localStorage.getItem('userdata'));
    return this.userSub = this.authService.getUserKey(this.fbu.uid).subscribe( snap => {
      this.key = snap[0].$key;
      this.data = snap[0].data;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  settings() {
    this.setTheme();
    this.themeService.setTheme(this.theme);

    const datas: User = {
      email: this.fbu.email,
      name: this.name || this.data.name,
      Constituency: this.constituency || this.data.Constituency
    };

    this.authService.getUserById(this.key).update(datas);
    return this.goBack();
  }

  goBack() {
    return this.navCtrl.back();
  }

}
