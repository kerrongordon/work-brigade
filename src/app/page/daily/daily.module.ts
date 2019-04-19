import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DailyPage } from './daily.page';
import { ElementModule } from 'src/app/share/element.module';
import { ItemHeaderComponent } from './item-header/item-header.component';
import { ListItemComponent } from './list-item/list-item.component';

const routes: Routes = [
  {
    path: '',
    component: DailyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DailyPage,
    ItemHeaderComponent,
    ListItemComponent
  ]
})
export class DailyPageModule {}
