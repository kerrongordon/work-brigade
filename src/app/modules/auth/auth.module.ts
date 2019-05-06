import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegiterComponent } from './pages/regiter/regiter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegiterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class AuthModule { }
