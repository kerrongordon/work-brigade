import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditBeneficiaryComponent } from './edit-beneficiary.component';

const routes: Routes = [
  { path: '', component: EditBeneficiaryComponent }
];

@NgModule({
  declarations: [
    EditBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class EditBeneficiaryModule { }
