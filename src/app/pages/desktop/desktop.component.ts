import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IThemeRgbColor } from '@lib-modules';
import { Subscription } from 'rxjs';
import { BackgroundMetadata, BackgroundService } from './features/background';
import { BackgroundTypeEnum } from './features/background/enums';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit, OnDestroy {
    @HostBinding('style.background')
    protected hostBackground: string;

    private backgroundSubscription: Subscription;

    constructor(
        private readonly titleService: Title,
        private readonly backgroundService: BackgroundService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle('ngx-os - Desktop');
        this.initBackgroundObserver();
    }

    public ngOnDestroy(): void {
        this.backgroundSubscription.unsubscribe();
    }

    private initHostBackground({ type, data }: BackgroundMetadata): void {
        if (type === BackgroundTypeEnum.Color) {
            const { r, g, b } = data as IThemeRgbColor;

            this.hostBackground = `rgb(${r}, ${g}, ${b})`;
        } else {
            this.hostBackground = `url(${data})`;
        }
    }

    private initBackgroundObserver(): void {
        this.backgroundSubscription = this.backgroundService.data$
            .subscribe((backgroundMetadata) => {
                this.initHostBackground(backgroundMetadata);
                this.changeDetector.markForCheck();
            });
    }
}
