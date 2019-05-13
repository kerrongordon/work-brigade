import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.component.html',
  styleUrls: ['./edit-beneficiary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBeneficiaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
