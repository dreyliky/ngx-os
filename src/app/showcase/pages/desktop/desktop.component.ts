import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Observable, Subscription } from 'rxjs';
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
export class DesktopComponent implements OnInit {
    @HostBinding('style.background')
    public hostBackgroundStylelist: string;

    @HostBinding('class')
    public hostClasslist: string;

    public taskbarPlacement$: Observable<TaskbarPlacement>;

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

    @AutoUnsubscribe()
    private initHostBackgroundStylelistObserver(): Subscription {
        return this.background.styles$
            .subscribe((styles) => {
                this.hostBackgroundStylelist = styles;

                this.changeDetector.markForCheck();
            });
    }

    @AutoUnsubscribe()
    private initHostClasslistObserver(): Subscription {
        return this.taskbar.classList$
            .subscribe((classList) => {
                this.hostClasslist = classList;

                this.changeDetector.markForCheck();
            });
    }
}
