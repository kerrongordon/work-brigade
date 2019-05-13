import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'beneficiary', pathMatch: 'full' },
  // { path: 'home', loadChildren: './page/home/home.module#HomePageModule', canActivate: [LoginGuard] },
  // { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  // { path: 'addbeneficiary/:id', loadChildren: './forms/monthly/monthly.module#MonthlyPageModule', canActivate: [LoginGuard] },
  // { path: 'dailyform/:id', loadChildren: './forms/daily/daily.module#DailyPageModule', canActivate: [LoginGuard] },
  // { path: 'settings', loadChildren: './forms/settings/settings.module#SettingsPageModule', canActivate: [LoginGuard] },
  // { path: 'dailyview/:id', loadChildren: './page/daily/daily.module#DailyPageModule', canActivate: [LoginGuard] },
  // { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  // { path: 'day/:id', loadChildren: './page/day/day.module#DayPageModule', canActivate: [LoginGuard] },

  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'beneficiary', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'form', loadChildren: './modules/form/form.module#FormModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
