import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailListComponent } from '@brigade-modules/home/components';
import { BeneficiaryListComponent } from './beneficiary-list.component';

const routes: Routes = [
  { path: '', component: BeneficiaryListComponent }
];

@NgModule({
  declarations: [
    BeneficiaryListComponent,
    DetailListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class BeneficiaryListModule { }
