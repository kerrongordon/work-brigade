import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  openItem(id: string) {
    return this.open.emit(id);
  }

  editItem(id: string) {
    return this.edit.emit(id);
  }

  deleteItem(id: string) {
    return this.delete.emit(id);
  }

}
