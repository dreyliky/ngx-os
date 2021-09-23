import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    /** Applied theme */
    public get applied$(): Observable<ThemeEnum> {
        return this._applied$.asObservable();
    }

    /** Applied theme */
    public get applied(): ThemeEnum {
        return this._applied$.getValue();
    }

    private themeLinkElement: HTMLLinkElement;
    private _applied$ = new BehaviorSubject<ThemeEnum>(ThemeEnum.Win10);

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {
        this.initThemeLinkElement();
    }

    /** Applies theme */
    public apply(themeName: ThemeEnum): void {
        this.themeLinkElement.href = `${themeName}.css`;

        this.document.body.classList.remove(this.applied);
        this.document.body.classList.add(themeName);
        this._applied$.next(themeName);
    }

    private initThemeLinkElement(): void {
        const headElement = this.document.getElementsByTagName('head')[0];
        this.themeLinkElement = this.document.createElement('link');
        this.themeLinkElement.rel = 'stylesheet';

        headElement.appendChild(this.themeLinkElement);
    }
}
