import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@brigade-shared/shared.module';
import { BeneficiaryDetailComponent, BeneficiaryListComponent } from './pages';
import { DetailHeaderComponent, DetailListComponent } from './components';


@NgModule({
  declarations: [
    BeneficiaryListComponent,
    BeneficiaryDetailComponent,
    DetailHeaderComponent,
    DetailListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class HomeModule { }
