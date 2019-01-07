import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kgp-kgp-nav',
  templateUrl: './kgp-nav.component.html',
  styleUrls: ['./kgp-nav.component.sass']
})
export class KgpNavComponent {

  constructor(private route: Router) {}

  goHome() {
    return this.route.navigate(['']);
  }

}
