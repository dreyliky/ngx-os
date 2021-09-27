import { Injectable, OnDestroy } from '@angular/core';
import { elementResizingObserver } from '@lib-helpers';
import { DynamicWindowSharedConfigService } from '@lib-modules';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TaskbarPlacementService } from './services';

@Injectable()
export class TaskbarService implements OnDestroy {
    private taskbarChangesSubscription: Subscription;

    constructor(
        private readonly placementService: TaskbarPlacementService,
        private readonly windowSharedConfigService: DynamicWindowSharedConfigService
    ) {}

    public ngOnDestroy(): void {
        this.taskbarChangesSubscription.unsubscribe();
        this.clear();
    }

    public initChangesObserver(taskbarElement: HTMLElement): void {
        this.taskbarChangesSubscription = combineLatest([
            elementResizingObserver(taskbarElement),
            this.placementService.data$
        ])
            .pipe(
                debounceTime(4)
            )
            .subscribe(() => this.update(taskbarElement));
    }

    private update(taskbarElement: HTMLElement): void {
        const placement = this.placementService.data;
        const elementSize = taskbarElement[placement.targetSizeProperty];

        this.windowSharedConfigService.update({
            fullscreenOffset: {
                [placement.windowConfigFullscreenOffsetKey]: `${elementSize}px`
            }
        });
    }

    private clear(): void {
        this.windowSharedConfigService.update({
            fullscreenOffset: {}
        });
    }
}
