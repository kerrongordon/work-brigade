import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: '', children: [
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/regiter/regiter.module#RegiterModule' },
    { path: 'passwordrestemail', loadChildren: './pages/password-rest-email/password-rest-email.module#PasswordRestEmailModule' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
