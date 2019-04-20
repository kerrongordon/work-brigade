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

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  settings(data) {
    return console.log(data);
  }

  goBack() {
    return this.navCtrl.back();
  }

}
