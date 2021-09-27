import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TASKBAR_PLACEMENT_ARRAY as PLACEMENTS } from '../data';
import { TaskbarPlacementEnum } from '../enums';
import { TaskbarPlacement } from '../interfaces';

@Injectable()
export class TaskbarPlacementService {
    public get data$(): Observable<TaskbarPlacement> {
        return this._data$.asObservable();
    }

    public get data(): TaskbarPlacement {
        return this._data$.getValue();
    }

    private readonly storageKey = 'taskbar-placement';

    private _data$ = new BehaviorSubject<TaskbarPlacement>(null);

    constructor() {
        this.initData();
    }

    public change(id: TaskbarPlacementEnum): void {
        const idAsJson = JSON.stringify(id);
        const placement = this.getPlacementById(id);

        localStorage.setItem(this.storageKey, idAsJson);
        this._data$.next(placement);
    }

    private getPlacementById(id: TaskbarPlacementEnum): TaskbarPlacement {
        return PLACEMENTS
            .find((placement) => placement.id === id);
    }

    private initData(): void {
        const dataAsJson = localStorage.getItem(this.storageKey);

        if (dataAsJson) {
            const id = JSON.parse(dataAsJson);
            const placement = this.getPlacementById(id);

            this._data$.next(placement);
        }
    }
}
