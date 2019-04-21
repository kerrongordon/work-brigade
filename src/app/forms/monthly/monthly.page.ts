import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/service/forms/dates.service';
import { typeOfWork } from 'src/app/export/typeOfWork';
import { ToastController, NavController } from '@ionic/angular';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { constituencies } from 'src/app/export/constituencies';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Beneficiary } from 'src/app/export/beneficiary';

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
  auth: firebase.User;

  constructor(
    private datesService: DatesService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private beneficiaryService: BeneficiaryService) { }

  ngOnInit() {
    this.pageType = this.activatedRoute.snapshot.paramMap.get('id');
    this.monthNames = this.datesService.getMonthName();
    this.MonthAbbreviation = this.datesService.getMonthAbbreviation();
    this.dayNames = this.datesService.getDayName();
    this.dayAbbreviation = this.datesService.getDayAbbreviation();
    this.loadData(this.pageType);
    this.auth = JSON.parse(localStorage.getItem('userdata'));
  }

  loadData(id: string) {
    if (id === 'add') { return; }
    return this.olddata = this.beneficiaryService.loadBeneficiaryById(id).valueChanges();
  }

  register(form) {

    if (form.value.name.trim() === '' || form.value.address.trim() === '') {
      return this.presentToastRegister('Please Fill Out The Form Completely');
    }

    const data: Beneficiary = {...form.value, userUuid: this.auth.uid};

    if (this.pageType === 'add') {
      this.beneficiaryService.registerBeneficiary(data);
      return this.goBack();
    } else {
      this.beneficiaryService.loadBeneficiaryById(this.pageType).update(data);
      return this.goBack();
    }
  }

  goBack() {
    return this.navCtrl.back();
  }

  async presentToastRegister(infor) {
    const toast = await this.toastController.create({
      message: infor,
      duration: 2000
    });
    toast.present();
  }



}
