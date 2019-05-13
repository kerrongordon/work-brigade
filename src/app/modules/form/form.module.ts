import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { AddBeneficiaryComponent, AddDailyComponent, EditBeneficiaryComponent, EditDailyComponent, SettingsComponent } from './pages';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent,
    AddDailyComponent,
    EditDailyComponent,
    AddBeneficiaryComponent,
    EditBeneficiaryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FormRoutingModule
  ]
})
export class FormModule { }
