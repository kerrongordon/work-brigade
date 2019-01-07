import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyViewComponent } from './daily-view.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';

const route: Routes = [{ path: '', component: DailyViewComponent }];

@NgModule({
  declarations: [DailyViewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(route)
  ]
})
export class DailyViewModule {}
