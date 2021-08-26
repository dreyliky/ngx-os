import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicWindowRef } from '../classes';

@Injectable()
export class DynamicWindowControlService {
    public get activeWindowId$(): Observable<string> {
        return this._activeWindowId$.asObservable();
    }

    public get windowIdsOrder$(): Observable<string[]> {
        return this._windowIdsOrder$.asObservable();
    }

    public get references$(): Observable<DynamicWindowRef[]> {
        return this._references$.asObservable();
    }

    public get references(): DynamicWindowRef[] {
        return this._references$.getValue();
    }

    private readonly _activeWindowId$ = new BehaviorSubject<string>(null);
    private readonly _windowIdsOrder$ = new BehaviorSubject<string[]>([]);
    private readonly _references$ = new BehaviorSubject<DynamicWindowRef[]>([]);

    public setActiveStateForWindowId(windowId: string): void {
        this._activeWindowId$.next(windowId);

        const windowIdsOrder = this._windowIdsOrder$.getValue()
            .filter((currWindowId) => currWindowId !== windowId);

        windowIdsOrder.push(windowId);

        this._windowIdsOrder$.next([...windowIdsOrder]);
    }

    public resetActiveWindowId(): void {
        this._activeWindowId$.next(null);
    }

    public addWindowComponentRef(windowComponentRef: DynamicWindowRef): void {
        this._references$.next([...this.references, windowComponentRef]);
    }

    public removeWindowComponentRef(windowComponentRef: DynamicWindowRef): void {
        const filteredWindowComponents = this.references
            .filter((currComponentRef) => currComponentRef !== windowComponentRef);

        this._references$.next([...filteredWindowComponents]);
    }
}
