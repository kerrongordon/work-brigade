import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/auth.service';

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
    this.user = JSON.parse(localStorage.getItem('userdata'));
  }

  setting() {
    return this.navCtrl.navigateForward('settings')
      .then(log => this.menu.close());
  }

  logout() {
    return this.authService.logOut()
      .then(log => this.menu.close());
  }

}
