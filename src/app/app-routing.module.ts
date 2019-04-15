import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'addbeneficiary/:id', loadChildren: './forms/monthly/monthly.module#MonthlyPageModule' },
  { path: 'daily', loadChildren: './forms/daily/daily.module#DailyPageModule' },
  { path: 'settings', loadChildren: './forms/settings/settings.module#SettingsPageModule' },
  { path: 'dailyview/:id', loadChildren: './page/daily/daily.module#DailyPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
