import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ɵDynamicWindowRefModel } from '../classes';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class ɵWindowReferencesState {
    public get data$(): Observable<ɵDynamicWindowRefModel[]> {
        return this._data$.asObservable();
    }

    public get data(): ɵDynamicWindowRefModel[] {
        return this._data$.getValue();
    }

    private readonly _data$ = new BehaviorSubject<ɵDynamicWindowRefModel[]>([]);

    private readonly windowRefMap: Map<string, ɵDynamicWindowRefModel> = new Map();

    public getById(id: string): ɵDynamicWindowRefModel {
        return this.windowRefMap.get(id);
    }

    public add(windowRef: ɵDynamicWindowRefModel): void {
        this.windowRefMap.set(windowRef.id, windowRef);
        this._data$.next([...this.data, windowRef]);
    }

    public remove(windowRef: ɵDynamicWindowRefModel): void {
        const targetWindowRefIndex = this.data.indexOf(windowRef);

        this.data.splice(targetWindowRefIndex, 1);
        this.windowRefMap.delete(windowRef.id);
        this._data$.next([...this.data]);
    }
}
