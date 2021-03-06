import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage,
  ) { }

  setTheme(theme) {
    this.storage.set('theme', theme);
    if (theme === 'dark') {
      return this.setGlobalCSS(this.darktheme());
    } else {
      return this.setGlobalCSS(this.lighttheme());
    }
  }

  darktheme() {
    return `
    --ion-background-color: #222428;
    --ion-background-color-rgb: rgb(34, 34, 34);
    --ion-text-color: #f5f6f9;
    `;
  }

  lighttheme() {
    return `
    --ion-background-color: #f5f6f9;
    --ion-background-color-rgb: rgb(245, 246, 249);
    --ion-text-color: #222428;
    `;
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }
}
