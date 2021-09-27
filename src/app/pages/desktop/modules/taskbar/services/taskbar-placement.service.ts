import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TASKBAR_PLACEMENT_ARRAY as PLACEMENTS } from '../data';
import { TaskbarPlacementEnum } from '../enums';
import { TaskbarPlacement } from '../interfaces';

@Injectable()
export class TaskbarPlacementService {
    public get data$(): Observable<TaskbarPlacement> {
        return this._data$
            .asObservable()
            .pipe(
                map((placementId) => PLACEMENTS.find((placement) => placement.id === placementId))
            );
    }

    public get data(): TaskbarPlacement {
        return PLACEMENTS
            .find((placement) => placement.id === this._data$.getValue());
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
