import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/service/forms/dates.service';
import { typeOfWork } from 'src/app/export/typeOfWork';
import { ToastController } from '@ionic/angular';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { constituencies } from 'src/app/export/constituencies';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private datesService: DatesService,
    private router: Router,
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
  }

  async register(form) {

    if (!form.valid || form.value.name.trim() === '' || form.value.address.trim() === '') {
      return await this.presentToastRegister('Please Fill Out The Form Completely');
    }

    await this.beneficiaryService.registerBeneficiary(form.value);
    return this.router.navigate(['home']);
  }

  async presentToastRegister(infor) {
    const toast = await this.toastController.create({
      message: infor,
      duration: 2000
    });
    toast.present();
  }



}
