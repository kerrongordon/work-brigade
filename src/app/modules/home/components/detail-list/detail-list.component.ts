import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailListComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
