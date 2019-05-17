import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ReportService } from '@brigade-core/services';
import { Observable } from 'rxjs';
import { Report } from '@brigade-core/models';

@Component({
  selector: 'app-beneficiary-detail',
  templateUrl: './beneficiary-detail.component.html',
  styleUrls: ['./beneficiary-detail.component.scss'],
})
export class BeneficiaryDetailComponent implements OnInit {
  id: string;
  data: Observable<Report>;

  constructor(
    private _navController: NavController,
    private _activatedRoute: ActivatedRoute,
    private _reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getIdFormRoute()
      .then(() => this.loadData());
  }

  async getIdFormRoute() {
    return this.id = await this._activatedRoute.snapshot.paramMap.get('id');
  }

  loadData() {
    return this.data = this._reportService.loadReportByIdWithSub(this.id);
  }

  async editBenef(id: string) {
    return await this._navController.navigateForward(['form/editbeneficiary', id]);
  }

  goBack() {
    return this._navController.back();
  }

}
