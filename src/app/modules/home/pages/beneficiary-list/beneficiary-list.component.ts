import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Report } from '@brigade-core/models';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss'],
})
export class BeneficiaryListComponent implements OnInit {

  data: Report[] = [
    {
      completed: true,
      address: 'River Sallee',
      name: 'Kerron Gordon',
      startDate: new Date().toDateString(),
      workType: 'New House',
    },
    {
      completed: false,
      address: 'River Sallee',
      name: 'Kerron Gordon',
      startDate: new Date().toDateString(),
      workType: 'New House',
    },
    {
      completed: true,
      address: 'Mt Rose',
      name: 'Kerron Gordon',
      startDate: new Date().toDateString(),
      workType: 'New House',
    },
    {
      completed: false,
      address: 'Rose Hill',
      name: 'Mark Gordon',
      startDate: new Date().toDateString(),
      workType: 'New House',
    },
  ];

  constructor(
    private _navController: NavController,
    private _menuController: MenuController,
  ) { }

  ngOnInit() {

  }

  openMenu() {
    return this._menuController.toggle('mainmenu');
  }

  async addbeneficiary() {
    return await this._navController.navigateForward('form/addbeneficiary');
  }

}
