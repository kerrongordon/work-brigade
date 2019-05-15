import { Component, OnInit } from '@angular/core';
import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { AuthService, ThemeService } from '@brigade-core/services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  themeDarkOrLight: string;
  themeBoolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private authService: AuthService,
    private menu: MenuController,
    private navCtrl: NavController,
    private _themeService: ThemeService,
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
    this.updatTheme();
  }

  async updatTheme() {
    const data = await this.storage.get('user');
    if (data === null) {
      return this._themeService.setTheme('light');
    }
    this.themeBoolean = data.theme === 'light' ? false : true;
    this.themeDarkOrLight = this.themeBoolean ? 'dark' : 'light';
    return this._themeService.setTheme(this.themeDarkOrLight);
  }

  async setting() {
    await this.navCtrl.navigateForward(['form/settings', 'edit']);
    return await this.menu.close();
  }

  async logout() {
    await this.authService.signOutUser();
    this.navCtrl.navigateRoot('auth');
    this.storage.set('user', null);
    return this.menu.close();
  }

}
