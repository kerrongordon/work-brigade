import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavController, AlertController } from '@ionic/angular';
import { Beneficiary } from 'src/app/export/beneficiary';
import { DailyService } from 'src/app/service/daily.service';
import { Daily } from 'src/app/export/daily';


@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {
  key: string;
  data: Observable<Beneficiary>;
  dailyData: Observable<Daily[]>;

  constructor(
    private navCtrl: NavController,
    private dailyService: DailyService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private beneficiaryService: BeneficiaryService
  ) { }

  ngOnInit() {
    this.loadKey()
      .then(data => this.loadData(this.key)
        .then(load => this.loadDaily()));
  }

  async loadKey() {
    return this.key = await this.activatedRoute.snapshot.paramMap.get('id');
  }

  async loadData(id: string) {
    return this.data = await this.beneficiaryService.loadBeneficiaryById(id).valueChanges();
  }

  async loadDaily() {
    return this.dailyData = await this.dailyService.loadDailyReport(this.key);
  }

  editBenef() {
    return this.navCtrl.navigateForward(['addbeneficiary', this.key]);
  }

  addDaliy() {
    return this.navCtrl.navigateForward(['dailyform', this.key, false]);
  }

  editDaily(event) {
    this.navCtrl.navigateForward(['dailyform', event.id, true]);
    return event.event.close();
  }

  deleteDaily(event) {
    this.presentAlertConfirm(event.id);
    return event.event.close();
  }

  deleteItem(id: string) {
    return this.dailyService.loadDailyById(id).delete();
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

  goBack() {
    return this.navCtrl.back();
  }

}
