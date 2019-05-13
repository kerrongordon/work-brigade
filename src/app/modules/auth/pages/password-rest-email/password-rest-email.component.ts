import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-password-rest-email',
  templateUrl: './password-rest-email.component.html',
  styleUrls: ['./password-rest-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordRestEmailComponent implements OnInit {

  email = '';

  constructor() { }

  ngOnInit() {}

  passwordrestemail() {

  }

}
