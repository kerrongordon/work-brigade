import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from 'src/app/export/beneficiary';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderComponent implements OnInit {

  @Input() data: Observable<Beneficiary>;

  constructor() { }

  ngOnInit() {  }

}
