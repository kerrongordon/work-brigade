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
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatBottomSheetModule
} from '@angular/material';
import { DeleteFormModule } from '../component/delete-form/delete-form.module';
import { DeleteFormComponent } from '../component/delete-form/delete-form.component';

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
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    DeleteFormModule,
    RouterModule.forChild(route)
  ],
  entryComponents: [DeleteFormComponent]
})
export class DailyViewModule {}
