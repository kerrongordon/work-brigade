import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '@brigade-core/models';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailListComponent {

  @Input() data: Report[];
  @Output() open = new EventEmitter();

  openItem(id: string) {
    return this.open.emit(id);
  }

}
