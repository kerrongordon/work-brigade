import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, RegiterComponent, PasswordRestEmailComponent } from './pages';

@NgModule({
  declarations: [
    LoginComponent,
    RegiterComponent,
    PasswordRestEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class AuthModule { }
