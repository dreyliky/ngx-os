import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    HostListener,
    OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DynamicWindowService, ɵOsBaseViewComponent } from 'ngx-os';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BackgroundService } from './features/background';
import { ExecService } from './features/exec';
import { TextDocumentsService, TextDocumentsState } from './features/file-system';
import { ShortcutSettingsService } from './features/shortcut';
import { TaskbarPlacement } from './modules';
import { DesktopBackgroundService, DesktopTaskbarService } from './services';

@Component({
    selector: 'showcase-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DynamicWindowService,
        ExecService,
        BackgroundService,
        TextDocumentsService,
        TextDocumentsState,
        ShortcutSettingsService,
        DesktopBackgroundService,
        DesktopTaskbarService
    ]
})
export class DesktopComponent extends ɵOsBaseViewComponent implements OnInit {
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
    ) {
        super();
    }

    public ngOnInit(): void {
        this.taskbarPlacement$ = this.taskbar.placement$;

        this.titleService.setTitle('ngx-os - Desktop');
        this.initHostBackgroundStylelistObserver();
        this.initHostClasslistObserver();
    }

    @HostListener('document:contextmenu', ['$event'])
    public onDocumentContextMenuEvent(event: Event): void {
        event.preventDefault();
    }

    private initHostBackgroundStylelistObserver(): void {
        this.background.styles$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((styles) => {
                this.hostBackgroundStylelist = styles;

                this.changeDetector.markForCheck();
            });
    }

    private initHostClasslistObserver(): void {
        this.taskbar.classList$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((classList) => {
                this.hostClasslist = classList;

                this.changeDetector.markForCheck();
            });
    }
}
