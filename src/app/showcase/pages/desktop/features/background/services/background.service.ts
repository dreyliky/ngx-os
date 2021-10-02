import { Injectable } from '@angular/core';
import { ACCENT_COLORS } from '@Features/theme';
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
    private readonly _data$ = new BehaviorSubject<BackgroundMetadata>(null);

    constructor() {
        this.applyDefaultIfNotExits();
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

    private applyDefaultIfNotExits(): void {
        const prefferedColorIndex = 25;
        const isAppliedBgExist = !!this.get();

        if (!isAppliedBgExist) {
            this.apply({
                type: BackgroundTypeEnum.Color,
                data: ACCENT_COLORS[prefferedColorIndex]
            });
        }
    }

    private initData(): void {
        const currentBg = this.get();

        this._data$.next(currentBg);
    }
}
