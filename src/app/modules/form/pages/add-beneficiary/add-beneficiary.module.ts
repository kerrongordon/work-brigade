import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddBeneficiaryComponent } from './add-beneficiary.component';

const routes: Routes = [
  { path: '', component: AddBeneficiaryComponent }
];

@NgModule({
  declarations: [
    AddBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class AddBeneficiaryModule { }
