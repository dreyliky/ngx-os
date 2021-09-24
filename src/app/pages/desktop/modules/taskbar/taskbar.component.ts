import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit
} from '@angular/core';
import { elementResizingObserver } from '@lib-helpers';
import { DynamicWindowRef, DynamicWindowService, DynamicWindowSharedConfigService } from '@lib-modules';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    public windowsRef: DynamicWindowRef[];

    private untilDestroyed$ = new Subject();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly dynamicWindowSharedConfigService: DynamicWindowSharedConfigService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initWindowReferencesObserver();
    }

    public ngAfterViewInit(): void {
        this.initTaskbarResizeObserver();
    }

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();

        this.dynamicWindowSharedConfigService.update({
            fullscreenOffset: { bottom: '0px' }
        });
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

    private initTaskbarResizeObserver(): void {
        elementResizingObserver(this.hostElementRef.nativeElement)
            .pipe(
                takeUntil(this.untilDestroyed$)
            )
            .subscribe(({ offsetHeight: taskbarHeight }) => {
                this.dynamicWindowSharedConfigService.update({
                    fullscreenOffset: { bottom: `${taskbarHeight}px` }
                });
            });
    }

    private initWindowReferencesObserver(): void {
        this.dynamicWindowService.references$
            .pipe(
                takeUntil(this.untilDestroyed$)
            )
            .subscribe((windowsRef) => {
                this.windowsRef = windowsRef;

                this.changeDetector.detectChanges();
            });
    }
}
