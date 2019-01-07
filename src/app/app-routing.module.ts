import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'monthlyform', loadChildren: './monthly-form/monthly-form.module#MonthlyFormModule'},
  { path: 'dailyform/:id', loadChildren: './daily-form/daily-form.module#DailyFormModule'},
  { path: 'daily/:id', loadChildren: './daily-view/daily-view.module#DailyViewModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
