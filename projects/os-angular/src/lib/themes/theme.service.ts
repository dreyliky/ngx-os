import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {}

    public applyTheme(themeName: string): void {
        const head = this.document.getElementsByTagName('head')[0];
        const themeLink = this.document.getElementById(
            'client-theme'
        ) as HTMLLinkElement;
        const themeHref = `${themeName}.css`;

        if (themeLink) {
            themeLink.href = themeHref;
        } else {
            const style = this.document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.href = themeHref;

            head.appendChild(style);
        }
    }

}
