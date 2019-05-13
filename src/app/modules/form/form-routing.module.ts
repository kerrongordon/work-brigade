import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBeneficiaryComponent, EditBeneficiaryComponent, AddDailyComponent, EditDailyComponent, SettingsComponent } from './pages';

const routes: Routes = [
  { path: '', children: [
    { path: 'adddaily', component: AddDailyComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'editdaily', component: EditDailyComponent },
    { path: 'addbeneficiary', component: AddBeneficiaryComponent },
    { path: 'editbeneficiary', component: EditBeneficiaryComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
