import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Report, User } from '@brigade-core/models';
import { ReportService } from '@brigade-core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss'],
})
export class BeneficiaryListComponent implements OnInit {

  data: Observable<Report[]>;

  constructor(
    private _storage: Storage,
    private _navController: NavController,
    private _menuController: MenuController,
    private _reportService: ReportService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const user: User = await this._storage.get('user');
    return this.data = this._reportService.loadUserReport(user.uid);
  }

  openMenu() {
    return this._menuController.toggle('mainmenu');
  }

  openItem(id: string) {
    return this._navController.navigateForward(['beneficiary/detail', id]);
  }

  async addbeneficiary() {
    return await this._navController.navigateForward('form/addbeneficiary');
  }

}
