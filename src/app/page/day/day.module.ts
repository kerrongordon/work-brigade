import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DayPage } from './day.page';
import { ElementModule } from 'src/app/share/element.module';

const routes: Routes = [
  {
    path: '',
    component: DayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DayPage]
})
export class DayPageModule {}
