import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiaryDetailComponent, BeneficiaryListComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: '', children: [
    { path: 'list', component: BeneficiaryListComponent },
    { path: 'detail', component: BeneficiaryDetailComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
