import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegiterComponent } from './regiter.component';

const routes: Routes = [
  { path: '', component: RegiterComponent }
];

@NgModule({
  declarations: [
    RegiterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RegiterModule { }
