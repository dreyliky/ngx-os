import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit
} from '@angular/core';
import { elementResizingObserver } from '@lib-helpers';
import { DynamicWindowRef, DynamicWindowService, DynamicWindowSharedConfigService } from '@lib-modules';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TaskbarPlacementService } from './services';

@Component({
    selector: 'desktop-taskbar',
    templateUrl: './taskbar.component.html',
    styleUrls: [
        './taskbar-win98.component.scss',
        './taskbar-winXP.component.scss',
        './taskbar-win10.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskbarComponent implements OnInit, AfterViewInit, OnDestroy {
    public windowRefs$: Observable<DynamicWindowRef[]>;

    private untilDestroyed$ = new Subject();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly taskbarPlacementService: TaskbarPlacementService,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly dynamicWindowSharedConfigService: DynamicWindowSharedConfigService
    ) {}

    public ngOnInit(): void {
        this.windowRefs$ = this.dynamicWindowService.references$;
    }

    public ngAfterViewInit(): void {
        this.initTaskbarChangesObserver();
    }

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();

        this.clearWindowSharedConfigFullscreenOffset();
    }

    public getTaskbarIconCssUrl(iconUrl: string): string {
        return `url(${iconUrl || '/assets/icons/icon.png'})`;
    }

    public onWindowReferenceIconClick(event: PointerEvent, windowRef: DynamicWindowRef): void {
        if (!windowRef.isHidden && !windowRef.isActive) {
            windowRef.setIsActive(true);
        } else {
            windowRef.toggleVisibility();
        }

        // Disable outside click checking for window (which removes active state)
        event.stopPropagation();
    }

    private initTaskbarChangesObserver(): void {
        combineLatest([
            elementResizingObserver(this.hostElementRef.nativeElement),
            this.taskbarPlacementService.data$
        ])
            .pipe(
                takeUntil(this.untilDestroyed$),
                debounceTime(4)
            )
            .subscribe(() => {
                const placement = this.taskbarPlacementService.data;
                const elementSize = this.hostElementRef.nativeElement[placement.targetSizeProperty];

                this.dynamicWindowSharedConfigService.update({
                    fullscreenOffset: {
                        [placement.windowConfigFullscreenOffsetKey]: `${elementSize}px`
                    }
                });
            });
    }

    private clearWindowSharedConfigFullscreenOffset(): void {
        this.dynamicWindowSharedConfigService.update({
            fullscreenOffset: {}
        });
    }
}
