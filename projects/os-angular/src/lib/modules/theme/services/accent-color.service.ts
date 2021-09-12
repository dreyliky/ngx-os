import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemeRgbColor } from '../interfaces';
import { ThemeColorType } from '../types';

@Injectable({
    providedIn: 'root'
})
export class AccentColorService {
    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {}

    public get(colorType: ThemeColorType): ThemeRgbColor {
        const cssColor = this.getFromCssVariable(colorType);

        if (cssColor) {
            return this.parseCssColor(cssColor);
        }

        return null;
    }

    public apply(colorType: ThemeColorType, { r, g, b }: ThemeRgbColor): void {
        const cssVariableName = this.getColorTypeCssVariableName(colorType);

        this.document.documentElement.style.setProperty(cssVariableName, `${r}, ${g}, ${b}`);
    }

    private getFromCssVariable(colorType: ThemeColorType): string {
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