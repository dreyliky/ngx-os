import {
    Injectable,
    ComponentRef
} from '@angular/core';

import { DynamicWindowComponent } from '../components';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class DynamicWindowControlService {

    public get activeWindowId$ (): Observable<string> {
        return this._activeWindowId$.asObservable();
    }

    public get windowIdsOrder$ (): Observable<string[]> {
        return this._windowIdsOrder$.asObservable();
    }

    public get windowComponentsRef$ (): Observable<ComponentRef<DynamicWindowComponent>[]> {
        return this._windowComponentsRef$.asObservable();
    }

    private readonly _activeWindowId$ = new BehaviorSubject<string>(null);
    private readonly _windowIdsOrder$ = new BehaviorSubject<string[]>([]);
    private readonly _windowComponentsRef$ = new BehaviorSubject<ComponentRef<DynamicWindowComponent>[]>([]);

    constructor () {}

    public getWindowComponentsRef (): ComponentRef<DynamicWindowComponent>[] {
        return this._windowComponentsRef$.getValue();
    }

    public setActiveStateForWindowId (windowId: string): void {
        this._activeWindowId$.next(windowId);

        const windowIdsOrder = this._windowIdsOrder$.getValue()
            .filter((currWindowId) => currWindowId !== windowId);

        windowIdsOrder.push(windowId);

        this._windowIdsOrder$.next([...windowIdsOrder]);
    }

    public addWindowComponentRef (windowComponentRef: ComponentRef<DynamicWindowComponent>): void {
        const windowComponents = this.getWindowComponentsRef();

        this._windowComponentsRef$.next([...windowComponents, windowComponentRef]);
    }

    public removeWindowComponentRef (windowComponentRef: ComponentRef<DynamicWindowComponent>): void {
        const filteredWindowComponents = this.getWindowComponentsRef()
            .filter((currComponentRef) => currComponentRef !== windowComponentRef);

        this._windowComponentsRef$.next([...filteredWindowComponents]);
    }

}
