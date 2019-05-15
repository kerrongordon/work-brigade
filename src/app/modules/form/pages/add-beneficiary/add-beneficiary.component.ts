import { User, Report } from '@brigade-core/models';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DatesService, ReportService } from '@brigade-core/services';
import { typeOfWork } from '@brigade-core/items';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBeneficiaryComponent implements OnInit {

  name = '';
  address = '';
  phoneNumber = '';
  startDate = '';
  workType = '';
  dayNames: string[];
  monthNames: string[];
  dayAbbreviation: string[];
  MonthAbbreviation: string[];

  typeOfWork = typeOfWork;
  user: User;

  isSaveing = false;

  constructor(
    private _storage: Storage,
    private _datesService: DatesService,
    private _navController: NavController,
    private _reportService: ReportService,
    private _toastController: ToastController,
  ) { }

  ngOnInit() {
    this.getUserInfor();
    this.dayNames = this._datesService.getDayName();
    this.monthNames = this._datesService.getMonthName();
    this.dayAbbreviation = this._datesService.getDayAbbreviation();
    this.MonthAbbreviation = this._datesService.getMonthAbbreviation();
  }

  async getUserInfor() {
    return this.user = await this._storage.get('user');
  }

  async addNewBeneficiary() {

    if (
      this.name.trim() === '' ||
      this.address.trim() === '' ||
      this.startDate.trim() === '' ||
      this.workType.trim() === ''
      ) {
        return this.presentToast('Please fill the from...');
      }

    this.isSaveing = true;

    const data: Report = await {
      completed: false,
      id: null,
      uid: this.user.uid,
      name: this.name,
      address: this.address,
      workType: this.workType,
      endDate: null,
      startDate: this.startDate,
      phoneNumber: this.phoneNumber,
    };

    await this._reportService.addNewReport(data);
    this.isSaveing = false;
    return this._navController.back();

  }

  async presentToast(message: string) {
    const toast = await this._toastController.create({ message, duration: 5000 });
    toast.present();
  }

  goBack() {
    return this._navController.back();
  }

}
