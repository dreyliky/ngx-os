import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShortcutSettingsData } from '../interfaces';

@Injectable()
export class ShortcutSettingsService {
    public get data$(): Observable<ShortcutSettingsData> {
        return this._data$.asObservable();
    }

    public get data(): ShortcutSettingsData {
        return this._data$.getValue();
    }

    private readonly storageKey = 'desktop-shortcuts-settings';
    private _data$ = new BehaviorSubject<ShortcutSettingsData>(null);

    constructor() {
        this.initData();
    }

    public initData(): void {
        const dataAsJson = localStorage.getItem(this.storageKey);

        if (dataAsJson) {
            const data = JSON.parse(dataAsJson);

            this._data$.next(data);
        }
    }

    public apply(data: ShortcutSettingsData): void {
        const dataAsJson = JSON.stringify(data);

        localStorage.setItem(this.storageKey, dataAsJson);
        this._data$.next(data);
    }
}
