import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemeRgbColor } from '../interfaces';
import { ThemeColorType } from '../types';

/**
 * @dynamic
 * Allows to apply accent colors
 **/
// See: https://github.com/angular/angular/issues/20351
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

    /** Gets color value from CSS variable */
    public get(colorType: ThemeColorType): ThemeRgbColor {
        const cssColor = this.getFromCssVariable(colorType);

        if (cssColor) {
            return this.parseCssColor(cssColor);
        }

        return null;
    }

    /** Sets color value into CSS variable. All components immediately change their color */
    public apply(colorType: ThemeColorType, { r, g, b }: ThemeRgbColor): void {
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

    private parseCssColor(cssColor: string): ThemeRgbColor {
        const colorAsArray = cssColor
            .split(',')
            .map((colorPart) => +colorPart.replace( /^\D+/g, ''));

        return { r: colorAsArray[0], g: colorAsArray[1], b: colorAsArray[2] };
    }
}
