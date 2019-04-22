import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Daily } from 'src/app/export/daily';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

  @Input() data: Observable<Daily[]>;
  @Output() onopen = new EventEmitter<string>();
  @Output() onedit = new EventEmitter<object>();
  @Output() ondelete = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {}

  open(id: string) {
    return this.onopen.emit(id);
  }

  edit(event: IonItemSliding, id: string) {
    return this.onedit.emit({event, id});
  }

  delete(event: IonItemSliding, id: string) {
    return this.ondelete.emit({event, id});
  }

}
