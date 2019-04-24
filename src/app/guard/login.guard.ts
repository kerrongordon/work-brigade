import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    public authService: AuthService,
  ) { }

  async canActivate() {

    return this.storage.get('islogin')
      .then(val => {
        if (val === true) {  return true; }
        this.navCtrl.navigateRoot('login');
        return false;
      });
  }
}
