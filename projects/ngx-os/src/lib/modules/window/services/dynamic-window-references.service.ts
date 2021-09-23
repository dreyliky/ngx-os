import { Injectable, OnDestroy } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { DynamicWindowRef } from '../classes';
import { WindowReferencesState } from '../states';
import { DynamicWindowActivityService } from './dynamic-window-activity.service';
import { DynamicWindowRefOrderingService } from './dynamic-window-ref-ordering.service';

/** @internal */
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
        private readonly activityService: DynamicWindowActivityService,
        private readonly orderingService: DynamicWindowRefOrderingService
    ) {}

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
    }

    public add(windowRef: DynamicWindowRef): void {
        this.state.add(windowRef);
        this.initHighestWindowActivityObserver(windowRef);
        this.initIsActiveStateObserver(windowRef);
    }

    public remove(windowRef: DynamicWindowRef): void {
        this.orderingService.remove(windowRef.id);
        this.state.remove(windowRef);
    }

    private initHighestWindowActivityObserver(windowRef: DynamicWindowRef): void {
        merge(
            windowRef.isHidden$.pipe(filter(Boolean)),
            windowRef.afterClosed$
        )
            .pipe(
                takeUntil(this.untilDestroyed$),
                map(() => this.orderingService.getHighestOpened())
            )
            .subscribe((highestWindow) => highestWindow?.setIsActive(true));
    }

    private initIsActiveStateObserver(windowRef: DynamicWindowRef): void {
        windowRef.isActive$
            .pipe(
                takeUntil(this.untilDestroyed$),
                filter(Boolean)
            )
            .subscribe(() => {
                this.orderingService.moveToTop(windowRef.id);
                this.orderingService.updateOrderIndexStateForAll();
                this.activityService.makeAllInactiveExceptSpecificId(windowRef.id);
            });
    }
}
