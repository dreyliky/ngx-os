import { Injectable } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DynamicWindowConfig, DynamicWindowRef } from '../classes';
import { IDynamicWindowParams } from '../interfaces';
import { WindowReferencesState } from '../states';
import { DynamicWindowActivityService } from './dynamic-window-activity.service';
import { DynamicWindowRefOrderingService } from './dynamic-window-ref-ordering.service';
import { DynamicWindowsCoordinatesService } from './dynamic-windows-coordinates.service';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowReferencesService {
    public get data$(): Observable<DynamicWindowRef[]> {
        return this.state.data$;
    }

    public get data(): DynamicWindowRef[] {
        return this.state.data;
    }

    constructor(
        private readonly state: WindowReferencesState,
        private readonly activityService: DynamicWindowActivityService,
        private readonly orderingService: DynamicWindowRefOrderingService,
        private readonly coordinatesService: DynamicWindowsCoordinatesService
    ) {}

    public register(windowRef: DynamicWindowRef, config: IDynamicWindowParams): void {
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

    @AutoUnsubscribe()
    private initHighestWindowActivityObserver(windowRef: DynamicWindowRef): Subscription {
        return merge(
            windowRef.isHidden$.pipe(filter(Boolean)),
            windowRef.afterClosed$
        )
            .pipe(
                map(() => this.orderingService.getHighestOpened())
            )
            .subscribe((highestWindow) => highestWindow?.setIsActive(true));
    }

    @AutoUnsubscribe()
    private initIsActiveStateObserver(windowRef: DynamicWindowRef): Subscription {
        return windowRef.isActive$
            .pipe(filter(Boolean))
            .subscribe(() => {
                this.orderingService.moveToTop(windowRef.id);
                this.orderingService.updateForAll();
                this.activityService.makeAllInactiveExceptSpecificId(windowRef.id);
            });
    }
}
