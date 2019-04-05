import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { months } from '../service/months';
import { constituencies } from '../service/constituencies';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { typeOfWork } from '../service/typeofwork';

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
    WorkToBeDone: [null, Validators.required],
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
  typeOfWork = typeOfWork;
  constituencies = constituencies;
  year: any[];
  isedit: string;
  iseditId: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
    private local: Location,
    private arout: ActivatedRoute) {}

  ngOnInit() {
    this.year = this.api.yearsList(2018);

    this.isEdit();
  }

  isEdit() {
    this.isedit = this.arout.snapshot.paramMap.get('isedit');
    this.iseditId = this.arout.snapshot.paramMap.get('id');

    if (this.isedit === null) { return; }

    return this.api.getOneMonthlyReport(this.iseditId).valueChanges()
      .subscribe(data => {
        this.MonthForm = this.fb.group({
          Month: [data.Month, Validators.required],
          Year: [data.Year, Validators.required],
          Constituency: [data.Constituency, Validators.required],
          BeneficiaryName: [data.BeneficiaryName, Validators.required],
          WorkToBeDone: [data.WorkToBeDone, Validators.required],
          DateWorkStarted: data.DateWorkStarted,
          DateWorkCompleted: data.DateWorkCompleted,
          ChallengesFaced: data.ChallengesFaced,
          WhatWasDoneToMitigateChallenges: data.WhatWasDoneToMitigateChallenges,
          Address: [data.Address, Validators.required],
          Contact: data.Contact,
          DateMaterialWereDelivered:  data.DateMaterialWereDelivered,
          CoordinatorName: data.CoordinatorName,
          HousingCoordinator: data.HousingCoordinator,
        });

        console.log(this.MonthForm);
      });
  }

  close() {
    return this.local.back();
  }

  async onSubmit() {
    if (!this.MonthForm.valid) { return; }
    const timestamp = new Date();
    await this.api.addMonthlyReport({ 'timestamp': timestamp, ...this.MonthForm.value});
    this.MonthForm.reset();
    return this.route.navigate(['']);
  }
}
