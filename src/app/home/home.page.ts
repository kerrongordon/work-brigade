import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../service/beneficiary.service';
import { Subscription, Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';

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
  data: Observable<Beneficiary[]>;

  search: Boolean = true;

  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    private beneficiaryService: BeneficiaryService
  ) { }

  ngOnInit() {
    this.loadDate();
  }

  open(key: string) {
    return this.navCtrl.navigateForward(['dailyview/', key]);
  }

  edit(key: string) {
    return this.navCtrl.navigateForward(['addbeneficiary/', key]);
  }

  delete(key: string) {
    return this.presentAlertConfirm(key);
  }

  addBeneficiary() {
    return this.navCtrl.navigateForward(['addbeneficiary/', 'add']);
  }

  loadDate() {
    return this.data = this.beneficiaryService.loadBeneficiary();
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
