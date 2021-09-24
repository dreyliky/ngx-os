import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskbarPlacementEnum } from '../enums';

@Injectable()
export class TaskbarPlacementService {
    public get data$(): Observable<TaskbarPlacementEnum> {
        return this._data$.asObservable();
    }

    public get data(): TaskbarPlacementEnum {
        return this._data$.getValue();
    }

    private readonly storageKey = 'taskbar-placement';

    private _data$ = new BehaviorSubject<TaskbarPlacementEnum>(TaskbarPlacementEnum.Bottom);

    constructor() {
        this.initData();
    }

    public change(placement: TaskbarPlacementEnum): void {
        const dataAsJson = JSON.stringify(placement);

        localStorage.setItem(this.storageKey, dataAsJson);
        this._data$.next(placement);
    }

    private initData(): void {
        const dataAsJson = localStorage.getItem(this.storageKey);

        if (dataAsJson) {
            const data = JSON.parse(dataAsJson);

            this._data$.next(data);
        }
    }
}
