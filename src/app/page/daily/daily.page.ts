import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {
  key: string;
  data: Observable<Beneficiary>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navCon: NavController,
    private beneficiaryService: BeneficiaryService
  ) { }

  ngOnInit() {
    this.key = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadData(this.key);
  }

  loadData(id: string) {
    return this.data = this.beneficiaryService.loadBeneficiaryById(id).valueChanges();
  }

  editBenef() {
    return this.navCon.navigateForward(['addbeneficiary', this.key]);
  }

}
