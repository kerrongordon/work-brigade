import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddDailyComponent } from './add-daily.component';

const routes: Routes = [
  { path: '', component: AddDailyComponent }
];

@NgModule({
  declarations: [
    AddDailyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class AddDailyModule { }
