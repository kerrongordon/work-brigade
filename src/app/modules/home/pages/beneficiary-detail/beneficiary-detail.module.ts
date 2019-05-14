import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailHeaderComponent } from '@brigade-modules/home/components';
import { BeneficiaryDetailComponent } from './beneficiary-detail.component';

const routes: Routes = [
  { path: '', component: BeneficiaryDetailComponent }
];

@NgModule({
  declarations: [
    BeneficiaryDetailComponent,
    DetailHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class BeneficiaryDetailModule { }
