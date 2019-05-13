import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
