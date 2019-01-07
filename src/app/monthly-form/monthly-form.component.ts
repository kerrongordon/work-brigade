import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { months } from '../service/months';
import { constituencies } from '../service/constituencies';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kgp-monthly-form',
  templateUrl: './monthly-form.component.html',
  styleUrls: ['./monthly-form.component.sass']
})
export class MonthlyFormComponent implements OnInit {
  MonthForm = this.fb.group({
    Month: [null, Validators.required],
    Year: [null, Validators.required],
    Constituency: [null, Validators.required],
    BeneficiaryName: [null, Validators.required],
    WorkToBeDone: null,
    DateWorkStarted: null,
    DateWorkCompleted: null,
    ChallengesFaced: null,
    WhatWasDoneToMitigateChallenges: null,
    Address: [null, Validators.required],
    Contact: null,
    DateMaterialWereDelivered: null,
    CoordinatorName: null,
    HousingCoordinator: null,
  });

  months = months;
  constituencies = constituencies;
  year: any[];

  constructor(private fb: FormBuilder, private api: ApiService, private route: Router, private local: Location) {}

  ngOnInit() {
    this.year = this.api.yearsList(2018);
  }

  close() {
    return this.local.back();
  }

  onSubmit() {
    if (!this.MonthForm.valid) { return; }
    const timestamp = new Date();
    return this.api.addMonthlyReport({ 'timestamp': timestamp, ...this.MonthForm.value})
      .then(clear => this.MonthForm.reset())
      .then(goback => this.route.navigate(['']));
  }
}
