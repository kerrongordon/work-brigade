import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { days } from '../service/daily';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kgp-daily-form',
  templateUrl: './daily-form.component.html',
  styleUrls: ['./daily-form.component.sass']
})
export class DailyFormComponent implements OnInit {
  dailyForm = this.fb.group({
    Day: [null, Validators.required],
    Qty: null,
    MaterialUse: null,
    PlannedActivities: null,
    Accomplished: null,
    Results: null,
    Challenges: null,
  });

  days = days;
  id: string;

  constructor(private fb: FormBuilder, private api: ApiService, private aroute: ActivatedRoute, private route: Router) {}

  ngOnInit() {
    this.id = this.aroute.snapshot.paramMap.get('id');
  }

  onSubmit() {
    if (!this.dailyForm.valid) { return; }
    const timestamp = new Date();
    return this.api.addDailyReport( { id: this.id, timestamp: timestamp, ...this.dailyForm.value } )
      .then(clear => this.dailyForm.reset())
      .then(goback => this.route.navigate(['daily/', this.id]));
  }
}
