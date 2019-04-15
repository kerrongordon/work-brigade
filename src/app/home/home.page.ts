import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeneficiaryService } from '../service/beneficiary.service';
import { DatesService } from '../service/forms/dates.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dataDate: { date: string; items: Beneficiary[]; }[];
  searchInput: string;
  loadDataSub: Subscription;
  filterargs: { title: string; };
  data: Observable<Beneficiary[]>;

  constructor(
    private router: Router,
    private beneficiaryService: BeneficiaryService
  ) { }

  ngOnInit() {
    this.loadDate();
  }

  open(key) {
    return this.router.navigate(['dailyview/', key]);
  }

  addBeneficiary() {
    return this.router.navigate(['addbeneficiary/', 'add']);
  }

  loadDate() {
    return this.data = this.beneficiaryService.loadBeneficiary();
  }

  onSearch($event) {
    return this.searchInput = $event.target.value;
  }

}
