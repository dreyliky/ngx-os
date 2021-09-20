import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    public get applied$(): Observable<ThemeEnum> {
        return this._applied$.asObservable();
    }

    public get applied(): ThemeEnum {
        return this._applied$.getValue();
    }

    private defaultTheme = ThemeEnum.Win10;

    private _applied$ = new BehaviorSubject<ThemeEnum>(this.defaultTheme);

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {}

    public apply(themeName: ThemeEnum): void {
        const head = this.document.getElementsByTagName('head')[0];
        const themeLink = this.document.getElementById('os-theme') as HTMLLinkElement;
        const themeHref = `${themeName}.css`;

        if (themeLink) {
            themeLink.href = themeHref;
        } else {
            const style = this.document.createElement('link');
            style.id = 'os-theme';
            style.rel = 'stylesheet';
            style.href = themeHref;

            head.appendChild(style);
        }

        this.document.body.classList.remove(this._applied$.getValue());
        this.document.body.classList.add(themeName);
        this._applied$.next(themeName);
    }
}
