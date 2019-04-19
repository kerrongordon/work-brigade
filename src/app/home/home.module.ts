import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SearchPipe } from '../pipe/search.pipe';
import { ListItemComponent } from './list-item/list-item.component';
import { ElementModule } from '../share/element.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    SearchPipe,
    ListItemComponent
  ],
})
export class HomePageModule {}
