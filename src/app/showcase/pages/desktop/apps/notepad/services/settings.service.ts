import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_FONT_SETTINGS } from '../data';
import { Settings } from '../interfaces';

@Injectable()
export class SettingsService {
    public get data$(): Observable<Settings> {
        return this._data$.asObservable();
    }

    public get data(): Settings {
        return this._data$.getValue();
    }

    private readonly _data$ = new BehaviorSubject<Settings>(
        { ...DEFAULT_FONT_SETTINGS }
    );

    public set(data: Settings): void {
        this._data$.next({ ...data });
    }

    public update(data: Partial<Settings>): void {
        this._data$.next({ ...this.data, ...data });
    }
}
