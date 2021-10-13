import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicWindowRefModel } from '../classes';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class WindowReferencesState {
    public get data$(): Observable<DynamicWindowRefModel[]> {
        return this._data$.asObservable();
    }

    public get data(): DynamicWindowRefModel[] {
        return this._data$.getValue();
    }

    private readonly _data$ = new BehaviorSubject<DynamicWindowRefModel[]>([]);

    private readonly windowRefMap: Map<string, DynamicWindowRefModel> = new Map();

    public getById(id: string): DynamicWindowRefModel {
        return this.windowRefMap.get(id);
    }

    public add(windowRef: DynamicWindowRefModel): void {
        this.windowRefMap.set(windowRef.id, windowRef);
        this._data$.next([...this.data, windowRef]);
    }

    public remove(windowRef: DynamicWindowRefModel): void {
        const targetWindowRefIndex = this.data.indexOf(windowRef);

        this.data.splice(targetWindowRefIndex, 1);
        this.windowRefMap.delete(windowRef.id);
        this._data$.next([...this.data]);
    }
}
