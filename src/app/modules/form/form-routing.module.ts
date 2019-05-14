import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', children: [
    { path: 'adddaily', loadChildren: './pages/add-daily/add-daily.module#AddDailyModule' },
    { path: 'settings/:type', loadChildren: './pages/settings/settings.module#SettingsModule' },
    { path: 'editdaily', loadChildren: './pages/edit-daily/edit-daily.module#EditDailyModule' },
    { path: 'addbeneficiary', loadChildren: './pages/add-beneficiary/add-beneficiary.module#AddBeneficiaryModule' },
    { path: 'editbeneficiary', loadChildren: './pages/edit-beneficiary/edit-beneficiary.module#EditBeneficiaryModule' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
