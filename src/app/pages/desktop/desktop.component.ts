import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { ThemeRgbColor } from '@lib-modules';
import { APPS } from './apps';
import { BackgroundMetadata, BackgroundService } from './features/background';
import { BackgroundTypeEnum } from './features/background/enums';
import { AppMetadata, ExecService } from './features/exec';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {
    @HostBinding('style.background')
    protected hostBackground: string;

    public programs = APPS;

    constructor(
        private readonly execService: ExecService,
        private readonly backgroundService: BackgroundService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initBackgroundObserver();
    }

    public onProgramShortcutDblClick(program: AppMetadata): void {
        this.execService.run(program);
    }

    private initHostBackground({ type, data }: BackgroundMetadata): void {
        if (type === BackgroundTypeEnum.Color) {
            const { r, g, b } = data as ThemeRgbColor;

            this.hostBackground = `rgb(${r}, ${g}, ${b})`;
        } else {
            this.hostBackground = `url(${data})`;
        }
    }

    private initBackgroundObserver(): void {
        this.backgroundService.data$
            .subscribe((backgroundMetadata) => {
                this.initHostBackground(backgroundMetadata);
                this.changeDetector.markForCheck();
            });
    }
}
