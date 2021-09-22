import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IThemeRgbColor } from '../interfaces';
import { ThemeColorType } from '../types';

@Injectable({
    providedIn: 'root'
})
export class AccentColorService {
    private readonly documentElement: HTMLElement;

    constructor(
        @Inject(DOCUMENT) { documentElement }: Document
    ) {
        this.documentElement = documentElement;
    }

    public get(colorType: ThemeColorType): IThemeRgbColor {
        const cssColor = this.getFromCssVariable(colorType);

        if (cssColor) {
            return this.parseCssColor(cssColor);
        }

        return null;
    }

    public apply(colorType: ThemeColorType, { r, g, b }: IThemeRgbColor): void {
        const cssVariableName = this.getColorTypeCssVariableName(colorType);

        this.documentElement.style.setProperty(cssVariableName, `${r}, ${g}, ${b}`);
    }

    private getFromCssVariable(colorType: ThemeColorType): string {
        const cssVariableName = this.getColorTypeCssVariableName(colorType);

        return this.documentElement.style.getPropertyValue(cssVariableName);
    }

    private getColorTypeCssVariableName(colorType: ThemeColorType): string {
        return `--os-${colorType}-color`;
    }

    private parseCssColor(cssColor: string): IThemeRgbColor {
        const colorAsArray = cssColor
            .split(',')
            .map((colorPart) => +colorPart.replace( /^\D+/g, ''));

        return { r: colorAsArray[0], g: colorAsArray[1], b: colorAsArray[2] };
    }
}
