import { Injectable } from '@angular/core';
import { AccentColorService, ThemeColorType, ThemeRgbColor } from 'os-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccentColorManagerService {
    public get applied$(): Observable<ThemeRgbColor> {
        return this._applied$.asObservable();
    }

    public get applied(): ThemeRgbColor {
        return this._applied$.getValue();
    }

    private accentColorStorageKey = 'accent-color';

    private _applied$ = new BehaviorSubject<ThemeRgbColor>(null);

    constructor(
        private readonly accentColorService: AccentColorService
    ) {}

    public get(colorType: ThemeColorType): ThemeRgbColor {
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

    public apply(colorType: ThemeColorType, color: ThemeRgbColor): void {
        const colorAsJson = JSON.stringify(color);

        this.accentColorService.apply(colorType, color);
        this._applied$.next(color);
        localStorage.setItem(this.accentColorStorageKey, colorAsJson);
    }
}
