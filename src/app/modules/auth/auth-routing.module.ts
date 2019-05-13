import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, PasswordRestEmailComponent, RegiterComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: '', children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegiterComponent },
    { path: 'passwordrestemail', component: PasswordRestEmailComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
