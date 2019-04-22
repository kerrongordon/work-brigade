import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  setTheme(theme) {
    if (theme === false) {
      return this.setGlobalCSS(this.lighttheme());
    } else {
      return this.setGlobalCSS(this.darktheme());
    }
  }

  darktheme() {
    return `
    --ion-background-color: #222428;
    --ion-background-color-rgb: rgb(34, 34, 34);
    --ion-text-color: #f5f6f9;
    --ion-text-color-rgb: rgb(245, 246, 249);
    --ion-color-dark: #222428;
    --ion-color-dark-rgb: 34, 34, 34;
    --ion-color-dark-contrast: #ffffff;
    --ion-color-dark-contrast-rgb: 255, 255, 255;
    --ion-color-dark-shade: #1e2023;
    --ion-color-dark-tint: #383a3e;
    `;
  }

  lighttheme() {
    return `
    --ion-background-color: #f5f6f9;
    --ion-background-color-rgb: rgb(245, 246, 249);
    --ion-text-color: #222428;
    --ion-text-color-rgb: rgb(34, 34, 34);
    --ion-color-light: #f4f5f8;
    --ion-color-light-rgb: 244, 244, 244;
    --ion-color-light-contrast: #000000;
    --ion-color-light-contrast-rgb: 0, 0, 0;
    --ion-color-light-shade: #d7d8da;
    --ion-color-light-tint: #f5f6f9;
    `;
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }
}
