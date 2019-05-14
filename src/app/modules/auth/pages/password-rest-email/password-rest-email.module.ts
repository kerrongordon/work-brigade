import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PasswordRestEmailComponent } from './password-rest-email.component';

const routes: Routes = [
  { path: '', component: PasswordRestEmailComponent }
];

@NgModule({
  declarations: [
    PasswordRestEmailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PasswordRestEmailModule { }
