import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DailyService } from 'src/app/service/daily.service';
import { Daily } from 'src/app/export/daily';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {
  id: string;
  data: Observable<Daily>;

  constructor(
    private navCtrl: NavController,
    private dailyService: DailyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getId().then(() => this.loadData());
  }

  async getId() {
    return this.id = await this.activatedRoute.snapshot.paramMap.get('id');
  }

  edit() {
    return this.navCtrl.navigateForward(['dailyform', this.id, true]);
  }

  loadData() {
    return this.data = this.dailyService.loadDailyById(this.id).valueChanges();
  }

  goBack() {
    return this.navCtrl.back();
  }

}
