import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/service/forms/dates.service';
import { ActivatedRoute } from '@angular/router';
import { Daily } from 'src/app/export/daily';
import { DailyService } from 'src/app/service/daily.service';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {
  id: string;
  dayNames: string[];
  monthNames: string[];
  dayAbbreviation: string[];
  MonthAbbreviation: string[];
  isAccomplished = false;
  bool: string;
  data: Observable<Daily>;

  constructor(
    private datesService: DatesService,
    private activatedRoute: ActivatedRoute,
    private dailyService: DailyService,
    private navCtrl: NavController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.dayNames = this.datesService.getDayName();
    this.monthNames = this.datesService.getMonthName();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bool = this.activatedRoute.snapshot.paramMap.get('bool');
    this.dayAbbreviation = this.datesService.getDayAbbreviation();
    this.MonthAbbreviation = this.datesService.getMonthAbbreviation();
    this.loadDaily();
  }

  loadDaily() {
    if (this.bool !== 'true') { return; }
    return this.data = this.dailyService.loadDailyById(this.id).valueChanges();
  }

  daily(form) {

    if (form.value.materialuse.trim() === '' || form.value.plannedactivities.trim() === '') {
      return this.presentToastRegister('Please Fill Out The Form Completely');
    }

    const cform = form.value;

    const data: Daily = { ...cform, monthId: this.id };

    if (this.bool === 'true') {
      this.dailyService.loadDailyById(this.id).update(cform);
      return this.goBack();
    }

    this.dailyService.addDailyReport(data);
    return this.goBack();
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
