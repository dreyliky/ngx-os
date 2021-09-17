import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DynamicWindowRef } from '../classes';
import { WindowReferencesState } from '../states';
import { DynamicWindowRefOrderingService } from './dynamic-window-ref-ordering.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowReferencesService implements OnDestroy {
    public get data$(): Observable<DynamicWindowRef[]> {
        return this.state.data$;
    }

    public get data(): DynamicWindowRef[] {
        return this.state.data;
    }

    private readonly untilDestroyed$ = new Subject();

    constructor(
        private readonly state: WindowReferencesState,
        private readonly orderingService: DynamicWindowRefOrderingService
    ) {}

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
    }

    public add(windowRef: DynamicWindowRef): void {
        this.state.add(windowRef);

        this.initIsHiddenStateObserver(windowRef);
        this.initIsActiveStateObserver(windowRef);
        this.initAfterClosedStateObserver(windowRef);
    }

    public remove(windowRef: DynamicWindowRef): void {
        this.orderingService.remove(windowRef.id);
        this.state.remove(windowRef);
    }

    private updateActiveWindow(windowRef: DynamicWindowRef): void {
        this.orderingService.makeHighest(windowRef.id);
        this.orderingService.updateOrderIndexForAll();
    }

    private makeHighestOpenedActive(): void {
        this.orderingService.getHighestOpenedWindowRef()
            ?.setIsActive(true);
    }

    private initIsHiddenStateObserver(windowRef: DynamicWindowRef): void {
        windowRef.isHidden$
            .pipe(
                takeUntil(this.untilDestroyed$),
                filter((isHidden) => isHidden)
            )
            .subscribe(() => this.makeHighestOpenedActive());
    }

    private initAfterClosedStateObserver(windowRef: DynamicWindowRef): void {
        windowRef.afterClosed$
            .pipe(
                takeUntil(this.untilDestroyed$)
            )
            .subscribe(() => this.makeHighestOpenedActive());
    }

    private initIsActiveStateObserver(windowRef: DynamicWindowRef): void {
        windowRef.isActive$
            .pipe(
                takeUntil(this.untilDestroyed$),
                filter((isActive) => isActive)
            )
            .subscribe(() => this.onWindowRefBecameActive(windowRef));
    }

    private onWindowRefBecameActive(windowRef: DynamicWindowRef): void {
        this.updateActiveWindow(windowRef);

        this.data.forEach((currWindowRef) => {
            if (currWindowRef.id !== windowRef.id) {
                currWindowRef.setIsActive(false);
            }
        });
    }
}
