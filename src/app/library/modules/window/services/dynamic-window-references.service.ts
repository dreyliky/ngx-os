import { Injectable, OnDestroy } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { DynamicWindowConfig, DynamicWindowRef } from '../classes';
import { IDynamicWindowConfig } from '../interfaces';
import { WindowReferencesState } from '../states';
import { DynamicWindowActivityService } from './dynamic-window-activity.service';
import { DynamicWindowRefOrderingService } from './dynamic-window-ref-ordering.service';
import { DynamicWindowsCoordinatesService } from './dynamic-windows-coordinates.service';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowReferencesService implements OnDestroy {
    public get data$(): Observable<DynamicWindowRef[]> {
        return this.state.data$;
    }

    public get data(): DynamicWindowRef[] {
        return [...this.state.data];
    }

    private destroyed$ = new Subject();

    constructor(
        private readonly state: WindowReferencesState,
        private readonly activityService: DynamicWindowActivityService,
        private readonly orderingService: DynamicWindowRefOrderingService,
        private readonly coordinatesService: DynamicWindowsCoordinatesService
    ) {}

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public register(windowRef: DynamicWindowRef, config: IDynamicWindowConfig): void {
        windowRef.init(new DynamicWindowConfig(config));
        this.state.add(windowRef);
        this.coordinatesService.applyDefault(windowRef);
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
                takeUntil(this.destroyed$),
                map(() => this.orderingService.getHighestOpened())
            )
            .subscribe((highestWindow) => highestWindow?.setIsActive(true));
    }

    private initIsActiveStateObserver(windowRef: DynamicWindowRef): void {
        windowRef.isActive$
            .pipe(
                takeUntil(this.destroyed$),
                filter(Boolean)
            )
            .subscribe(() => {
                this.orderingService.moveToTop(windowRef.id);
                this.orderingService.updateForAll();
                this.activityService.makeAllInactiveExceptSpecificId(windowRef.id);
            });
    }
}
