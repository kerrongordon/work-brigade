import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Beneficiary } from 'src/app/export/beneficiary';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderComponent implements OnInit, OnDestroy {

  @Input() data: Observable<Beneficiary>;
  key: firebase.User;
  consti: string;
  sub: Subscription;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.key = JSON.parse(localStorage.getItem('userdata'));
    this.getCon();
  }

  getCon() {
    const { key } = this;
    this.sub = this.auth.getUserKey(key.uid).subscribe(data => {
      this.consti = data[0].data.Constituency;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
