import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavController } from '@ionic/angular';
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
    return this.navCtrl.navigateForward(['dailyform', this.key]);
  }

  goBack() {
    return this.navCtrl.back();
  }

}
