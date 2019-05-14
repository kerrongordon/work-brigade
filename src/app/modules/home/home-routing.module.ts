import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: '', children: [
    { path: 'list', loadChildren: './pages/beneficiary-list/beneficiary-list.module#BeneficiaryListModule' },
    { path: 'detail', loadChildren: './pages/beneficiary-detail/beneficiary-detail.module#BeneficiaryDetailModule' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
