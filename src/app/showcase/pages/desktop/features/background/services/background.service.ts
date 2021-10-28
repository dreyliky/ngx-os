import { Injectable } from '@angular/core';
import { ACCENT_COLORS } from '@features/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackgroundTypeEnum } from '../enums';
import { BackgroundMetadata } from '../interfaces';

@Injectable()
export class BackgroundService {
    public get data$(): Observable<BackgroundMetadata> {
        return this._data$.asObservable();
    }

    public get data(): BackgroundMetadata {
        return this._data$.getValue();
    }

    private readonly localStorageKey = 'desktop-custom-bg';
    private readonly _data$ = new BehaviorSubject<BackgroundMetadata>({
        type: BackgroundTypeEnum.Color,
        data: ACCENT_COLORS[25]
    });

    constructor() {
        this.initData();
    }

    public get(): BackgroundMetadata {
        const dataAsJson = localStorage.getItem(this.localStorageKey);

        return (dataAsJson) ? JSON.parse(dataAsJson) : null;
    }

    public apply(data: BackgroundMetadata): void {
        const dataAsJson = JSON.stringify(data);

        localStorage.setItem(this.localStorageKey, dataAsJson);
        this._data$.next(data);
    }

    private initData(): void {
        const dataFromStorage = this.get();

        if (dataFromStorage) {
            this._data$.next(dataFromStorage);
        }
    }
}
