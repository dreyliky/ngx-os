import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/** Allows to apply themes **/
@Injectable({
    providedIn: 'root'
})
export class ThemeService<T = any> {
    /** Applied theme */
    public get applied$(): Observable<T> {
        return this._applied$.asObservable();
    }

    /** Applied theme */
    public get applied(): T {
        return this._applied$.getValue();
    }

    private themeLinkElement: HTMLLinkElement;
    private _applied$ = new BehaviorSubject<T>(null);

    constructor(
        @Inject(DOCUMENT) private readonly document: Document
    ) {
        this.initThemeLinkElement();
    }

    /** Applies theme */
    public apply(themeName: T): void {
        this.themeLinkElement.href = `${themeName}.css`;

        this.document.body.classList.remove(this.applied as any);
        this.document.body.classList.add(themeName as any);
        this._applied$.next(themeName);
    }

    private initThemeLinkElement(): void {
        const headElement = this.document.getElementsByTagName('head')[0];
        this.themeLinkElement = this.document.createElement('link');
        this.themeLinkElement.type = 'text/css';
        this.themeLinkElement.rel = 'stylesheet';

        headElement.appendChild(this.themeLinkElement);
    }
}
