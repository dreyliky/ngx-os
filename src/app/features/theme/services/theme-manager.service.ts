import { Injectable } from '@angular/core';
import { ThemeEnum, ThemeService } from 'os-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeManagerService {
    public get applied$(): Observable<ThemeEnum> {
        return this._applied$.asObservable();
    }

    public get applied(): ThemeEnum {
        return this._applied$.getValue();
    }

    private themeStorageKey = 'theme';
    private defaultTheme = ThemeEnum.Win10;

    private _applied$ = new BehaviorSubject<ThemeEnum>(this.defaultTheme);

    constructor(
        private readonly themeService: ThemeService
    ) {}

    public init(): void {
        const theme = <ThemeEnum>localStorage.getItem(this.themeStorageKey) || this.defaultTheme;

        this.themeService.applyTheme(theme);
        this._applied$.next(theme);
    }

    public apply(theme: ThemeEnum): void {
        this.themeService.applyTheme(theme);
        localStorage.setItem(this.themeStorageKey, theme);
        this._applied$.next(theme);
    }
}
