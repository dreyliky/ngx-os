import { Injectable } from '@angular/core';
import { ɵIsNil } from 'ngx-os';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DevExamplesVisibilityService {
    public get data$(): Observable<boolean> {
        return this._data$.asObservable();
    }

    public get data(): boolean {
        return this._data$.getValue();
    }

    private readonly storageKey = 'is-dev-examples-visible';
    private _data$ = new BehaviorSubject<boolean>(!environment.production);

    constructor() {
        this.initData();
    }

    public apply(isVisible: boolean): void {
        localStorage.setItem(this.storageKey, JSON.stringify(isVisible));
        this._data$.next(isVisible);
    }

    private initData(): void {
        const dataAsJson = localStorage.getItem(this.storageKey);
        const data = (dataAsJson) ? JSON.parse(dataAsJson) : null;

        if (!ɵIsNil(data)) {
            this._data$.next(data);
        }
    }
}
