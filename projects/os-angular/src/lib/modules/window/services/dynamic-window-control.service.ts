import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DynamicWindowRef } from '../classes';

@Injectable()
export class DynamicWindowControlService implements OnDestroy {
    public get windowIdsOrder$(): Observable<string[]> {
        return this._windowIdsOrder$.asObservable();
    }

    public get windowIdsOrder(): string[] {
        return this._windowIdsOrder$.getValue();
    }

    public get references$(): Observable<DynamicWindowRef[]> {
        return this._references$.asObservable();
    }

    public get references(): DynamicWindowRef[] {
        return this._references$.getValue();
    }

    private readonly _windowIdsOrder$ = new BehaviorSubject<string[]>([]);
    private readonly _references$ = new BehaviorSubject<DynamicWindowRef[]>([]);

    private readonly untilDestroyed$ = new Subject();

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
    }

    public addWindowRef(windowRef: DynamicWindowRef): void {
        this._references$.next([...this.references, windowRef]);

        this.initWindowRefIsActiveStateObserver(windowRef);
    }

    public removeWindowRef(windowRef: DynamicWindowRef): void {
        const filteredWindowComponents = this.references
            .filter((currComponentRef) => currComponentRef !== windowRef);

        this._references$.next([...filteredWindowComponents]);
    }

    private updateActiveWindow(windowRef: DynamicWindowRef): void {
        const windowIdsOrder = this.windowIdsOrder
            .filter((currWindowId) => currWindowId !== windowRef.id);

        windowIdsOrder.push(windowRef.id);
        this._windowIdsOrder$.next([...windowIdsOrder]);
        this.updateWindowReferencesOrderIndex();
    }

    private updateWindowReferencesOrderIndex(): void {
        this.references.forEach((windowRef) => {
            const orderIndex = this.windowIdsOrder.indexOf(windowRef.id);

            windowRef.setOrderIndex(orderIndex);
        });
    }

    private initWindowRefIsActiveStateObserver(windowRef: DynamicWindowRef): void {
        windowRef.isActive$
            .pipe(
                takeUntil(this.untilDestroyed$),
                filter((isActive) => isActive)
            )
            .subscribe(() => this.onWindowRefActive(windowRef));
    }

    private onWindowRefActive(windowRef: DynamicWindowRef): void {
        this.updateActiveWindow(windowRef);

        this.references.forEach((currWindowRef) => {
            if (currWindowRef.id !== windowRef.id) {
                currWindowRef.setIsActive(false);
            }
        });
    }
}
