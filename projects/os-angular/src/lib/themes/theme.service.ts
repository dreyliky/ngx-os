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

        if (themeLink) {
            themeLink.href = themeName;
        } else {
            const style = this.document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.href = `${themeName}.css`;

            head.appendChild(style);
        }
    }

}
