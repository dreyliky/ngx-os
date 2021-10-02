import { Injectable } from '@angular/core';
import { ThemeService } from 'ngx-os';
import { Observable } from 'rxjs';
import { ThemeEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ThemeManagerService {
    public get applied$(): Observable<ThemeEnum> {
        return this.themeService.applied$;
    }

    public get applied(): ThemeEnum {
        return this.themeService.applied;
    }

    private themeStorageKey = 'theme';

    constructor(
        private readonly themeService: ThemeService<ThemeEnum>
    ) {}

    public init(): void {
        const theme = <ThemeEnum>localStorage.getItem(this.themeStorageKey) || ThemeEnum.Win10;

        this.themeService.apply(theme);
    }

    public apply(theme: ThemeEnum): void {
        this.themeService.apply(theme);
        localStorage.setItem(this.themeStorageKey, theme);
    }
}
