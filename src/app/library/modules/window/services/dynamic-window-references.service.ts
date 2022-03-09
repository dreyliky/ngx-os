import { Injectable, OnDestroy } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ɵDynamicWindowConfigModel, ɵDynamicWindowRefModel } from '../classes';
import { DynamicWindowConfig as IDynamicWindowConfig } from '../interfaces';
import { ɵWindowReferencesState } from '../states';
import { ɵDynamicWindowActivityService } from './dynamic-window-activity.service';
import { ɵDynamicWindowRefOrderingService } from './dynamic-window-ref-ordering.service';
import { ɵDynamicWindowsDefaultCoordinatesService } from './dynamic-windows-coordinates.service';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class ɵDynamicWindowReferencesService implements OnDestroy {
    public get data$(): Observable<ɵDynamicWindowRefModel[]> {
        return this.state.data$;
    }

    public get data(): ɵDynamicWindowRefModel[] {
        return [...this.state.data];
    }

    private destroyed$ = new Subject();

    constructor(
        private readonly state: ɵWindowReferencesState,
        private readonly activityService: ɵDynamicWindowActivityService,
        private readonly orderingService: ɵDynamicWindowRefOrderingService,
        private readonly defaultCoordinatesService: ɵDynamicWindowsDefaultCoordinatesService
    ) {}

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public register(windowRef: ɵDynamicWindowRefModel, config: IDynamicWindowConfig): void {
        windowRef.init(new ɵDynamicWindowConfigModel(config));
        this.state.add(windowRef);
        this.defaultCoordinatesService.applyIfSpecificAbsent(windowRef);
        this.initHighestWindowActivityObserver(windowRef);
        this.initIsActiveStateObserver(windowRef);
    }

    public remove(windowRef: ɵDynamicWindowRefModel): void {
        this.orderingService.remove(windowRef.id);
        this.state.remove(windowRef);
    }

    private initHighestWindowActivityObserver(windowRef: ɵDynamicWindowRefModel): void {
        merge(
            windowRef.isHidden$.pipe(filter(Boolean)),
            windowRef.afterClosed$
        )
            .pipe(
                map(() => this.orderingService.getHighestOpened()),
                takeUntil(this.destroyed$)
            )
            .subscribe((highestWindow) => highestWindow?.makeActive());
    }

    private initIsActiveStateObserver(windowRef: ɵDynamicWindowRefModel): void {
        windowRef.isActive$
            .pipe(
                filter(Boolean),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => {
                this.orderingService.moveToTop(windowRef.id);
                this.orderingService.updateForAll();
                this.activityService.makeAllInactiveExceptSpecificId(windowRef.id);
            });
    }
}
