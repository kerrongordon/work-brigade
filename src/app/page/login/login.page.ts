import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
  ) { }

  async login() {
    const {email, password} = await this;
    if (email.trim() !== '' && password.trim() !== '') {
      return this.authService.logIn(email, password);
    }
  }

}
