import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
  ) { }

  async canActivate() {
    const getData = this.authService.getUserData();

    if (getData === null) {
      this.navCtrl.navigateRoot('login');
      return false;
    } else {
      return true;
    }
  }
}
