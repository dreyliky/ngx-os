import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { TaskbarPlacement } from './modules';
import { DesktopBackgroundService, DesktopTaskbarService } from './services';

@Component({
    selector: 'showcase-desktop-page',
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

    public taskbarPlacement$: Observable<TaskbarPlacement>;

    private untilDestroyed$ = new Subject();

    constructor(
        private readonly titleService: Title,
        private readonly taskbar: DesktopTaskbarService,
        private readonly background: DesktopBackgroundService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.taskbarPlacement$ = this.taskbar.placement$;

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
        this.taskbar.classList$
            .subscribe((classList) => {
                this.hostClasslist = classList;

                this.changeDetector.markForCheck();
            });
    }
}
