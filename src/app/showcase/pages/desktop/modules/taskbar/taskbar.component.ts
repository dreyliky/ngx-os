import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {
    ButtonComponent,
    DynamicWindowRef,
    DynamicWindowService,
    ɵOsBaseViewComponent
} from 'ngx-os';
import { takeUntil } from 'rxjs/operators';
import { TaskbarService } from './taskbar.service';

@Component({
    selector: 'desktop-taskbar',
    templateUrl: './taskbar.component.html',
    styleUrls: [
        './taskbar-win98.component.scss',
        './taskbar-winXP.component.scss',
        './taskbar-win10.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TaskbarService
    ]
})
export class TaskbarComponent extends ɵOsBaseViewComponent implements OnInit, AfterViewInit {
    @ViewChildren(ButtonComponent, { read: ElementRef })
    public set windowRefElements(data: QueryList<ElementRef<HTMLElement>>) {
        this.taskbarService.setWindowRefElements(data);
    }

    @HostBinding('class.has-window-refs')
    public get hostHasWindowRefsClass(): boolean {
        return !!this.windowRefs.length;
    }

    public windowRefs: DynamicWindowRef[];

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly taskbarService: TaskbarService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initWindowRefsObserver();
    }

    public override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.taskbarService.init(this.hostRef.nativeElement);
    }

    public getTaskbarIconCssUrl(iconUrl: string): string {
        return `url(${iconUrl || '/assets/showcase/icons/icon.png'})`;
    }

    public onWindowReferenceIconClick(event: PointerEvent, windowRef: DynamicWindowRef): void {
        if (!windowRef.isHidden && !windowRef.isActive) {
            windowRef.makeActive();
        } else {
            windowRef.toggleVisibility();
        }
    }

    private initWindowRefsObserver(): void {
        this.dynamicWindowService.references$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((windowRefs) => {
                this.windowRefs = windowRefs;

                this.changeDetector.markForCheck();
            });
    }
}
