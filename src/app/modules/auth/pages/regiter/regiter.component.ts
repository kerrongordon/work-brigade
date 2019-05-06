import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegiterComponent implements OnInit {

  email: '' | null;
  password: '' | null;
  cpassword: '' | null;

  constructor() { }

  ngOnInit() {}

  register() {
    console.log(this.email, this.password);
  }

}
