import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDynamicWindowParams } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowSharedConfigService {
    public get data$(): Observable<IDynamicWindowParams> {
        return this._data$.asObservable();
    }

    public get data(): IDynamicWindowParams {
        return this._data$.getValue();
    }

    private _data$ = new BehaviorSubject<IDynamicWindowParams>({});

    public update(updatedConfig: IDynamicWindowParams): void {
        this._data$.next({ ...this.data, ...updatedConfig });
    }

    public clear(): void {
        this._data$.next({});
    }
}
