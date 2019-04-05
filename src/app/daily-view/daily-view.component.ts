import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { map } from 'rxjs/operators';
import { Daily } from '../interface/daily';
import { Observable } from 'rxjs';
import { Monthly } from '../interface/monthly';
import { MatBottomSheet } from '@angular/material';
import { DeleteFormComponent } from '../component/delete-form/delete-form.component';

@Component({
  selector: 'kgp-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.sass'],
})
export class DailyViewComponent implements OnInit {
  id: string;
  daily: Observable<Daily[]>;
  Monthly: Monthly;
  isLoading = true;

  constructor(
    private aroute: ActivatedRoute,
    private route: Router,
    private api: ApiService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.id = this.aroute.snapshot.paramMap.get('id');
    this.loadDailyReports();
    this.getMonthlyReport();
  }

  loadDailyReports() {
    return this.daily = this.api.getListOfDailyReport(this.id).snapshotChanges()
        .pipe(map(arr => arr.map(snap => ({ $key: snap.payload.doc.id, ...snap.payload.doc.data() }))));
  }

  getMonthlyReport() {
    return this.api.getOneMonthlyReport(this.id).valueChanges()
      .subscribe(data => {this.Monthly = data; this.isLoading = false; });
  }

  addReport() {
    return this.route.navigate(['dailyform', this.id]);
  }

  trackByFn(index, item) {
    return item.$key;
  }

  deleteMonthPrompt() {
    return this.bottomSheet.open(DeleteFormComponent)
      .afterDismissed()
      .subscribe(data => {
        if (data) { this.deletlMonth(); }
      });
  }

  deleteDayPrompt(id: String) {
    return this.bottomSheet.open(DeleteFormComponent)
      .afterDismissed()
      .subscribe(data => {
        if (data) { this.deletlDay(id); }
      });
  }

  deletlDay(id: String) {
    return this.api.deleteDailyReport(id);
  }

  editMonth(isEdit: Boolean) {
    return this.route.navigate(['monthlyform', {id: this.id, isedit: isEdit}]);
  }

  deletlMonth() {
    const ids = this.api.getListOfDailyReport(this.id).snapshotChanges()
      .pipe( map( arr => arr.map(snap => snap.payload.doc.id) ) );

    ids.subscribe(data => {

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.api.deleteDailyReport(element);
      }

    });

    this.api.deleteMonthlyReport(this.id);

    return this.route.navigate(['']);
  }

}
