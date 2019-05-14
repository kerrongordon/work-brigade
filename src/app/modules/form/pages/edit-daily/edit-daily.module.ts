import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditDailyComponent } from './edit-daily.component';

const routes: Routes = [
  { path: '', component: EditDailyComponent }
];

@NgModule({
  declarations: [
    EditDailyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EditDailyModule { }
