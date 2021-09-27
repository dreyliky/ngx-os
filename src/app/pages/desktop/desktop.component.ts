import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { DesktopBackgroundService, DesktopTaskbarService } from './services';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DesktopBackgroundService,
        DesktopTaskbarService
    ]
})
export class DesktopComponent implements OnInit, OnDestroy {
    @HostBinding('style.background')
    public hostBackgroundStylelist: string;

    @HostBinding('class')
    public hostClasslist: string;

    private untilDestroyed$ = new Subject();

    constructor(
        private readonly titleService: Title,
        private readonly taskbar: DesktopTaskbarService,
        private readonly background: DesktopBackgroundService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle('ngx-os - Desktop');
        this.initHostBackgroundStylelistObserver();
        this.initHostClasslistObserver();
    }

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
    }

    private initHostBackgroundStylelistObserver(): void {
        this.background.styles$
            .subscribe((styles) => {
                this.hostBackgroundStylelist = styles;

                this.changeDetector.markForCheck();
            });
    }

    private initHostClasslistObserver(): void {
        this.taskbar.classlist$
            .subscribe((classlist) => {
                this.hostClasslist = classlist;

                this.changeDetector.markForCheck();
            });
    }
}
