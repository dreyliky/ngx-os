import { Injectable } from '@angular/core';
import { AccentColorService, IThemeRgbColor, ThemeColorType } from 'ngx-os';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccentColorManagerService {
    public get applied$(): Observable<IThemeRgbColor> {
        return this._applied$.asObservable();
    }

    public get applied(): IThemeRgbColor {
        return this._applied$.getValue();
    }

    private accentColorStorageKey = 'accent-color';

    private _applied$ = new BehaviorSubject<IThemeRgbColor>(null);

    constructor(
        private readonly accentColorService: AccentColorService
    ) {}

    public get(colorType: ThemeColorType): IThemeRgbColor {
        return this.accentColorService.get(colorType);
    }

    public init(): void {
        const accentColorAsJson = localStorage.getItem(this.accentColorStorageKey);
        const accentColor = (accentColorAsJson) ? JSON.parse(accentColorAsJson) : null;

        if (accentColor) {
            this.accentColorService.apply('primary', accentColor);
            this._applied$.next(accentColor);
        }
    }

    public apply(colorType: ThemeColorType, color: IThemeRgbColor): void {
        const colorAsJson = JSON.stringify(color);

        this.accentColorService.apply(colorType, color);
        this._applied$.next(color);
        localStorage.setItem(this.accentColorStorageKey, colorAsJson);
    }
}
