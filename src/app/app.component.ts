import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/auth.service';
import { ThemeService } from './service/theme.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private authService: AuthService,
    private menu: MenuController,
    private navCtrl: NavController,
    private themeService: ThemeService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.storage.get('theme').then(val => {
      this.themeService.setTheme(val);
    });
  }

  async setting() {
    await this.navCtrl.navigateForward('settings');
    return await this.menu.close();
  }

  async logout() {
    await this.authService.userSignOut();
    return this.menu.close();
  }

}
