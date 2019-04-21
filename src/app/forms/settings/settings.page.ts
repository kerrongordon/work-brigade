import { Component, OnInit } from '@angular/core';
import { constituencies } from 'src/app/export/constituencies';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constituencies = constituencies;
  constsit: any;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.constsit = JSON.parse(localStorage.getItem('setting'));
  }

  settings(data) {
    if (data.value.constituency === '') { return; }
    localStorage.setItem('setting', JSON.stringify(data.value));
    return console.log(data.value);
  }

  goBack() {
    return this.navCtrl.back();
  }

}
