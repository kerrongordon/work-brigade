import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { Monthly } from '../interface/monthly';
import { Observable } from 'rxjs';
import { months } from '../service/months';
import { Router } from '@angular/router';


@Component({
  selector: 'kgp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  monthly: Observable<Monthly[]>;

  loading = true;

  months = months;
  Month: string;
  YearList: any[];
  selectMonthItem: String;
  selectYearItem: number;

  monthlyLength = 0;
  Year: number;

  constructor(private api: ApiService, private router: Router) {
    this.Month = new Date().toLocaleString('us-en', { month: 'long' });
    this.Year = new Date().getFullYear();
    this.YearList = this.api.yearsList(2018);
  }

  ngOnInit() {
    this.loadMonthlyReportByMonth(this.Month, this.Year);
  }

  loadMonthlyReportByMonth(month: String, Year: number) {
    this.api.getListOfMonthlyReportForDashBoard(month, Year).valueChanges()
    .subscribe(data => {
      this.monthlyLength = data.length;
      this.loading = false;
    });

    return this.monthly = this.api.getListOfMonthlyReportForDashBoard(month, Year)
        .snapshotChanges()
        .pipe( map(acctions => acctions.map(snap => ({$key: snap.payload.doc.id, ...snap.payload.doc.data() }))));
  }

  selectAMonth(month: String) {
    this.selectMonthItem = month;
    return this.updateMonthList();
  }

  selectYear(Year: number) {
    this.selectYearItem = Year;
    return this.updateMonthList();
  }

  updateMonthList() {
    return this.loadMonthlyReportByMonth(this.selectMonthItem || this.Month, this.selectYearItem || this.Year);
  }

  openDailyReport(id) {
    return this.router.navigate(['daily', id]);
  }

  addReport() {
    return this.router.navigate(['monthlyform']);
  }

}
