import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { typeOfWork } from 'src/app/export/typeOfWork';
import { Beneficiary } from 'src/app/export/beneficiary';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { constituencies } from 'src/app/export/constituencies';
import { DatesService } from 'src/app/service/forms/dates.service';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.page.html',
  styleUrls: ['./monthly.page.scss'],
})
export class MonthlyPage implements OnInit, OnDestroy {
  dayNames: string[];
  monthNames: string[];
  dayAbbreviation: string[];
  MonthAbbreviation: string[];

  typeOfWork = typeOfWork;
  constituencies = constituencies;
  pageType: string;


  startDate: string;
  endDate: string | null | undefined;
  address = '';
  name = '';
  phoneNumber = '';
  workType: string;
  completed: Boolean;
  uid: string;
  id: string;
  uidLocal: string;
  loadDataForEditSub: Subscription;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private datesService: DatesService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private beneficiaryService: BeneficiaryService) { }

  ngOnInit() {
    this.pageType = this.activatedRoute.snapshot.paramMap.get('id');

    this.dayNames = this.datesService.getDayName();
    this.monthNames = this.datesService.getMonthName();
    this.dayAbbreviation = this.datesService.getDayAbbreviation();
    this.MonthAbbreviation = this.datesService.getMonthAbbreviation();

    this.getUserUid();
    this.loadDataForEdit();
  }

  ngOnDestroy() {
    if (this.pageType !== 'add') {
      this.loadDataForEditSub.unsubscribe();
    }
  }

  // NOTE Error Notification
  async errorNoti(infor: string) {
    const toast = await this.toastController.create({
      message: infor,
      duration: 4000
    });
    toast.present();
  }


  // NOTE Go Back a page
  goBack() {
    return this.navCtrl.back();
  }


  // NOTE Add New Beneficiary
  addNewBeneficiary() {

    if (this.name.trim() === '' ||
      this.address.trim() === '' ||
      this.startDate === '' ||
      this.workType === '') {
        this.errorNoti('Please ensure that you include Name, Address, Start Date and Work Type');
        return;
      }

    const infor: Beneficiary = {
      'startDate': this.startDate || '',
      'endDate': this.endDate || '',
      'address': this.address || '',
      'name': this.name || '',
      'phoneNumber': this.phoneNumber || '',
      'workType': this.workType || '',
      'completed': this.completed || false,
      'uid': this.uidLocal,
      'id': this.id || ''
    };
    return this.findOutPageType(infor);
  }


  // NOTE Get User Uid
  async getUserUid() {
    return this.uidLocal = await this.storage.get('userdata');
  }


  // NOTE Find out what Page Type we are on Then POST or UPDATE
  findOutPageType(infor: Beneficiary) {
    if (this.pageType === 'add') {
      this.beneficiaryService.registerBeneficiary(infor);
      return this.goBack();
    } else {
      this.beneficiaryService.loadBeneficiaryById(this.pageType).update(infor);
      return this.goBack();
    }
  }


  // NOTE Load Data for editing
  loadDataForEdit() {
    if (this.pageType  === 'add') { return; }
    this.loadDataForEditSub = this.beneficiaryService.loadBeneficiaryById(this.pageType).valueChanges()
      .subscribe(data => {
        this.startDate  = data.startDate;
        this.endDate = data.endDate;
        this.address = data.address;
        this.name = data.name,
        this.phoneNumber = data.phoneNumber;
        this.workType = data.workType;
        this.completed = data.completed;
        this.uid = data.uid;
        this.id = data.id;
      });
  }

}
