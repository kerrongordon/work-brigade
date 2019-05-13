import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBeneficiaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
