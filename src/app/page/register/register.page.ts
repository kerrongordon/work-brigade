import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email = '';
  password = '';
  cpassword = '';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }


  async register() {
    const { email, password, cpassword } = await this;
    if (email.trim() !== '' &&  password.trim() !== '' && cpassword === password) {
      return this.authService.register(email, password);
    }
  }

}
