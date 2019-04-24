import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../../service/beneficiary.service';
import { Subscription, Observable } from 'rxjs';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { Beneficiary } from '../../export/beneficiary';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dataDate: { date: string; items: Beneficiary[]; }[];
  searchInput: string;
  loadDataSub: Subscription;
  filterargs: { title: string; };

  search: Boolean = true;
  data: Observable<Beneficiary[]>;

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    public alertController: AlertController,
    private beneficiaryService: BeneficiaryService
  ) { }

  ngOnInit() {
    this.loadDate();
  }

  openMenu() {
    return this.menu.toggle('mainmenu');
  }

  open(key: string) {
    return this.navCtrl.navigateForward(['dailyview/', key]);
  }

  edit(event) {
    this.navCtrl.navigateForward(['addbeneficiary/', event.id]);
    return event.event.close();
  }

  delete(event) {
    this.presentAlertConfirm(event.id);
    return event.event.close();
  }

  addBeneficiary() {
    return this.navCtrl.navigateForward(['addbeneficiary/', 'add']);
  }

  loadDate() {
    return this.data = this.beneficiaryService.LoadAllBeneficiary('uurw5z1Jv4egRl8GKQevBEXBpCp1');
  }

  onSearch($event) {
    return this.searchInput = $event.target.value;
  }

  deleteItem(key: string) {
    return this.beneficiaryService.loadBeneficiaryById(key).delete();
  }

  async presentAlertConfirm(key: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are You Sure You Want To <strong>Delete</strong> This Item!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteItem(key);
          }
        }
      ]
    });

    await alert.present();
  }

}
