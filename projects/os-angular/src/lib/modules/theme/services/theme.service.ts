import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemeRgbColor } from '../interfaces';
import { ThemeColorType } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {}

    public getColor(colorType: ThemeColorType): ThemeRgbColor {
        const cssColor = this.getColorFromCssVariable(colorType);

        if (cssColor) {
            return this.parseCssColor(cssColor);
        }

        return null;
    }

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

    public applyColor(colorType: ThemeColorType, { r, g, b }: ThemeRgbColor): void {
        const cssVariableName = this.getColorTypeCssVariableName(colorType);

        this.document.documentElement.style.setProperty(cssVariableName, `${r}, ${g}, ${b}`);
    }

    private getColorFromCssVariable(colorType: ThemeColorType): string {
        const cssVariableName = this.getColorTypeCssVariableName(colorType);

        return this.document.documentElement.style.getPropertyValue(cssVariableName);
    }

    private getColorTypeCssVariableName(colorType: ThemeColorType): string {
        return `--os-${colorType}-color`;
    }

    private parseCssColor(cssColor: string): ThemeRgbColor {
        const colorAsArray = cssColor
            .split(',')
            .map((colorPart) => +colorPart.replace( /^\D+/g, ''));

        return { r: colorAsArray[0], g: colorAsArray[1], b: colorAsArray[2] };
    }
}
