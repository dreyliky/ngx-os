import { Injectable } from '@angular/core';
import { ThemeColorType, ThemeRgbColor, ThemeService } from 'os-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ThemeManagerService {
    public get appliedTheme$(): Observable<ThemeEnum> {
        return this._appliedTheme$.asObservable();
    }

    public get appliedTheme(): ThemeEnum {
        return this._appliedTheme$.getValue();
    }

    private themeStorageKey = 'theme';
    private defaultTheme = ThemeEnum.Win10;

    private _appliedTheme$ = new BehaviorSubject<ThemeEnum>(this.defaultTheme);

    constructor(
        private readonly themeService: ThemeService
    ) {}

    public getColor(colorType: ThemeColorType): ThemeRgbColor {
        return this.themeService.getColor(colorType);
    }

    public applyThemeFromStorage(): void {
        const theme = <ThemeEnum>localStorage.getItem(this.themeStorageKey) || this.defaultTheme;

        this.themeService.applyTheme(theme);
        this._appliedTheme$.next(theme);
    }

    public applyTheme(theme: ThemeEnum): void {
        this.themeService.applyTheme(theme);
        localStorage.setItem(this.themeStorageKey, theme);
        this._appliedTheme$.next(theme);
    }

    public applyColor(colorType: ThemeColorType, color: ThemeRgbColor): void {
        this.themeService.applyColor(colorType, color);
    }
}
