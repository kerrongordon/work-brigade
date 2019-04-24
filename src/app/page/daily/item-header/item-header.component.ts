import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Beneficiary } from 'src/app/export/beneficiary';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderComponent  {

  @Input() data: Observable<Beneficiary>;

}
