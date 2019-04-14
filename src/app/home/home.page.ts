import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeneficiaryService } from '../service/beneficiary.service';
import { Observable } from 'rxjs';
import { DatesService } from '../service/forms/dates.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: Observable<Beneficiary[]>;
  monthNames: string[];
  dataDate: { date: string; items: Beneficiary; }[];

  constructor(
    private router: Router,
    private datesService: DatesService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit() {
    this.data = this.beneficiaryService.loadBeneficiary();
    this.monthNames = this.datesService.getMonthName();
    this.dataFilter(this.data);
  }

  open() {
    return this.router.navigate(['dailyview']);
  }

  addBeneficiary() {
    return this.router.navigate(['addbeneficiary/', 'add']);
  }

  private dataFilter(data: Observable<Beneficiary[]>) {
    data.subscribe(inf => {
      inf.map(arr => arr);

      const groups = inf.reduce( ( groups, item ) => {
        const date = item.startDate.split('-', 2);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});

      console.log(groups);


      this.dataDate = Object.keys(groups).map((date) => {
        return { date, items: groups[date] };
      });

      console.log(this.dataDate);

    });
  }


}
