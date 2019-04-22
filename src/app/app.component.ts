import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/auth.service';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  user: firebase.User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menu: MenuController,
    private navCtrl: NavController,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.loadUser();
    this.getSaveTheme();
  }

  async getSaveTheme() {
    const constsit: {theme: boolean} = await JSON.parse(localStorage.getItem('theme'));
    if (constsit === null || constsit === undefined) { return; }
    return this.themeService.setTheme(constsit.theme);
  }

  loadUser() {
     return this.authService.itemValue.subscribe(data => this.user = data);
  }

  async setting() {
    const log = await this.navCtrl.navigateForward('settings');
    return await this.menu.close();
  }

  async logout() {
    const log = await this.authService.logOut();
    const log_1 = await this.menu.close();
    return this.loadUser().unsubscribe();
  }

}
