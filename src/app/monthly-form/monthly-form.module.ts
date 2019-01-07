import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyFormComponent } from './monthly-form.component';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  { path: '', component: MonthlyFormComponent }
];

@NgModule({
  declarations: [MonthlyFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(route)
  ],
  providers: [MatDatepickerModule]
})
export class MonthlyFormModule { }
