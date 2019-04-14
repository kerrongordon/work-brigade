import { Component, OnInit } from '@angular/core';
import { constituencies } from 'src/app/export/constituencies';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constituencies = constituencies;

  constructor() { }

  ngOnInit() {
  }

  settings(data) {
    return console.log(data);
  }

}
