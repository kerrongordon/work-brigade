import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/service/forms/dates.service';
import { typeOfWork } from 'src/app/export/typeOfWork';
import { ToastController, NavController } from '@ionic/angular';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { constituencies } from 'src/app/export/constituencies';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.page.html',
  styleUrls: ['./monthly.page.scss'],
})
export class MonthlyPage implements OnInit {
  monthNames: string[];
  MonthAbbreviation: string[];
  dayNames: string[];
  dayAbbreviation: string[];

  typeOfWork = typeOfWork;
  constituencies = constituencies;
  pageType: string;
  edd: string | any;
  olddata: Observable<Beneficiary>;

  constructor(
    private datesService: DatesService,
    private router: Router,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private beneficiaryService: BeneficiaryService) { }

  ngOnInit() {

    this.pageType = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.pageType);

    this.monthNames = this.datesService.getMonthName();
    this.MonthAbbreviation = this.datesService.getMonthAbbreviation();
    this.dayNames = this.datesService.getDayName();
    this.dayAbbreviation = this.datesService.getDayAbbreviation();

    this.loadData(this.pageType);
  }

  loadData(id) {
    if (id === 'add') { return; }

    this.olddata = this.beneficiaryService.loadBeneficiaryById(id).valueChanges();
  }

  register(form) {

    if (form.value.name.trim() === '' || form.value.address.trim() === '') {
      return this.presentToastRegister('Please Fill Out The Form Completely');
    }

    const data: Beneficiary = form.value;

    console.log(data);

    if (this.pageType === 'add') {
      this.beneficiaryService.registerBeneficiary(data);
      return this.navCtrl.navigateBack('/home');
    } else {
      this.beneficiaryService.loadBeneficiaryById(this.pageType).update(data);
      return this.navCtrl.navigateBack(['dailyview/', this.pageType]);
    }
  }

  async presentToastRegister(infor) {
    const toast = await this.toastController.create({
      message: infor,
      duration: 2000
    });
    toast.present();
  }



}
