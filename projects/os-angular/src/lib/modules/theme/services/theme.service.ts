import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemeRgbColor } from '../interfaces';
import { ThemeColor } from '../types';

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

    public applyColor(themeColor: ThemeColor, color: ThemeRgbColor): void {
        this.document.documentElement.style.setProperty(
            `--os-${themeColor}-color`,
            `${color.r}, ${color.g}, ${color.b}`
        );
    }

}
