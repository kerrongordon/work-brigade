import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Report } from '@brigade-core/models';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailHeaderComponent implements OnInit {

  @Input() data: Report;

  constructor() { }

  ngOnInit() {}

}
