import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IThemeRgbColor } from '@lib-modules';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BackgroundMetadata, BackgroundService, BackgroundTypeEnum } from './features/background';
import { TaskbarPlacementService, TASKBAR_PLACEMENT_ARRAY } from './modules/taskbar';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit, OnDestroy {
    @HostBinding('style.background')
    public hostBackground: string;

    @HostBinding('class')
    protected hostClasslist: string;

    private untilDestroyed$ = new Subject();

    constructor(
        private readonly titleService: Title,
        private readonly taskbarPlacementService: TaskbarPlacementService,
        private readonly backgroundService: BackgroundService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle('ngx-os - Desktop');
        this.initTaskbarPlacementObserver();
        this.initBackgroundObserver();
    }

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
    }

    private initHostBackground({ type, data }: BackgroundMetadata): void {
        if (type === BackgroundTypeEnum.Color) {
            const { r, g, b } = data as IThemeRgbColor;

            this.hostBackground = `rgb(${r}, ${g}, ${b})`;
        } else {
            this.hostBackground = `url(${data})`;
        }
    }

    private initTaskbarPlacementObserver(): void {
        this.taskbarPlacementService.data$
            .pipe(
                takeUntil(this.untilDestroyed$),
                map((data) => TASKBAR_PLACEMENT_ARRAY.find((placement) => placement.id === data))
            )
            .subscribe((placement) => {
                this.hostClasslist = placement.cssClassName;

                this.changeDetector.detectChanges();
            });
    }

    private initBackgroundObserver(): void {
        this.backgroundService.data$
            .pipe(
                takeUntil(this.untilDestroyed$)
            )
            .subscribe((backgroundMetadata) => {
                this.initHostBackground(backgroundMetadata);
                this.changeDetector.markForCheck();
            });
    }
}
