import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Daily } from 'src/app/export/daily';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

  @Input() data: Observable<Daily[]>;

  constructor() { }

  ngOnInit() {}

}
