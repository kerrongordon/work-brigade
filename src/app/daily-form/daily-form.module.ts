import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyFormComponent } from './daily-form.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  { path: '', component: DailyFormComponent }
];

@NgModule({
  declarations: [DailyFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class DailyFormModule { }
