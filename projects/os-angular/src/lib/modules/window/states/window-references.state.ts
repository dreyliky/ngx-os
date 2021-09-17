import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicWindowRef } from '../classes';

/** Private service */
@Injectable({
    providedIn: 'root'
})
export class WindowReferencesState {
    public get data$(): Observable<DynamicWindowRef[]> {
        return this._data$.asObservable();
    }

    public get data(): DynamicWindowRef[] {
        return this._data$.getValue();
    }

    private readonly _data$ = new BehaviorSubject<DynamicWindowRef[]>([]);

    private readonly windowRefMap: Map<string, DynamicWindowRef> = new Map();

    public getById(id: string): DynamicWindowRef {
        return this.windowRefMap.get(id);
    }

    public add(windowRef: DynamicWindowRef): void {
        this.windowRefMap.set(windowRef.id, windowRef);
        this._data$.next([...this.data, windowRef]);
    }

    public remove(windowRef: DynamicWindowRef): void {
        const targetWindowRefIndex = this.data.indexOf(windowRef);

        this.data.splice(targetWindowRefIndex, 1);
        this.windowRefMap.delete(windowRef.id);
        this._data$.next([...this.data]);
    }
}
