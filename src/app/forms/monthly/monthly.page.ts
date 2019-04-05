import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/service/forms/dates.service';
import { typeOfWork } from 'src/app/export/typeOfWork';
import { ToastController } from '@ionic/angular';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { constituencies } from 'src/app/export/constituencies';

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

  constructor(
    private datesService: DatesService,
    private toastController: ToastController,
    private beneficiaryService: BeneficiaryService) { }

  ngOnInit() {
    this.monthNames = this.datesService.getMonthName();
    this.MonthAbbreviation = this.datesService.getMonthAbbreviation();
    this.dayNames = this.datesService.getDayName();
    this.dayAbbreviation = this.datesService.getDayAbbreviation();
  }

  async register(form) {

    if (!form.valid || form.value.name.trim() === '' || form.value.address.trim() === '') {
      return await this.presentToastRegister('Please Fill Out The Form Completely');
    }

    return await this.beneficiaryService.registerBeneficiary(form.value);
  }

  async presentToastRegister(infor) {
    const toast = await this.toastController.create({
      message: infor,
      duration: 2000
    });
    toast.present();
  }



}
