import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Beneficiary } from 'src/app/export/beneficiary';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

  @Input() data: Observable<Beneficiary[]>;
  @Input() searchInput: string;

  @Output() open = new EventEmitter<string>();
  @Output() edit = new EventEmitter<object>();
  @Output() delete = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {}

  openItem(id: string) {
    return this.open.emit(id);
  }

  editItem(event: IonItemSliding, id: string) {
    return this.edit.emit({event, id});
  }

  deleteItem(event: IonItemSliding, id: string) {
    return this.delete.emit({event, id});
  }

}
