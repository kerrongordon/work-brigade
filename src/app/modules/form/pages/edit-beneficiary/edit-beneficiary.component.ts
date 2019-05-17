import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { typeOfWork } from '@brigade-core/items';
import { DatesService, ReportService } from '@brigade-core/services';
import { Subscription, Observable } from 'rxjs';
import { Report } from '@brigade-core/models';

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.component.html',
  styleUrls: ['./edit-beneficiary.component.scss'],
})
export class EditBeneficiaryComponent implements OnInit, OnDestroy {

  dayNames: string[];
  monthNames: string[];
  dayAbbreviation: string[];
  MonthAbbreviation: string[];

  data: Report;

  typeOfWork = typeOfWork;

  isSaveing = false;
  id: string;
  datasub: Subscription;

  constructor(
    private _navController: NavController,
    private _datesService: DatesService,
    private _reportService: ReportService,
    private _activatedRoute: ActivatedRoute,
    private _toastController: ToastController,
  ) { }

  ngOnInit() {
    this.isSaveing = true;
    this.getRouteId();
    this.dayNames = this._datesService.getDayName();
    this.monthNames = this._datesService.getMonthName();
    this.dayAbbreviation = this._datesService.getDayAbbreviation();
    this.MonthAbbreviation = this._datesService.getMonthAbbreviation();
  }

  async getRouteId() {
    this.id = await this._activatedRoute.snapshot.paramMap.get('id');
    return this.loaddata(this.id);
  }

  loaddata(id: string) {
    return this.datasub = this._reportService.loadReportByIdWithSub(id)
      .subscribe(data => { this.isSaveing = false; this.data = { ...data }; });
  }

  async editBeneficiary() {

    if (
      this.data.name.trim() === '' ||
      this.data.address.trim() === '' ||
      this.data.startDate.trim() === '' ||
      this.data.workType.trim() === ''
      ) {
        return this.presentToast('Please fill the from...');
      }

    this.isSaveing = true;
    await this._reportService.loadReportById(this.id).update(this.data);
    this.isSaveing = false;
    return this.goBack();

  }

  async presentToast(message: string) {
    const toast = await this._toastController.create({ message, duration: 5000 });
    toast.present();
  }

  ngOnDestroy() {
    this.datasub.unsubscribe();
  }

  goBack() {
    return this._navController.back();
  }

}
