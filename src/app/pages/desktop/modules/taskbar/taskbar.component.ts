import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import { ButtonComponent, DynamicWindowRef, DynamicWindowService } from '@lib-modules';
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
export class TaskbarComponent implements OnInit, AfterViewInit {
    public windowRefs: DynamicWindowRef[];

    @ViewChildren(ButtonComponent, { read: ElementRef })
    protected set windowRefElements(data: QueryList<ElementRef<HTMLElement>>) {
        this._windowRefElements = data;

        this.updateWindowRefsHidesIntoCoordinate();
    }

    private _windowRefElements: QueryList<ElementRef<HTMLElement>>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly taskbarService: TaskbarService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initWindowRefsObserver();
    }

    public ngAfterViewInit(): void {
        this.taskbarService.initChangesObserver(this.hostElementRef.nativeElement);
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

    private initWindowRefsObserver(): void {
        this.dynamicWindowService.references$
            .subscribe((windowRefs) => {
                this.windowRefs = windowRefs;

                this.changeDetector.detectChanges();
            });
    }

    private updateWindowRefsHidesIntoCoordinate(): void {
        console.log(this._windowRefElements);
        this._windowRefElements.forEach(({ nativeElement: element }) => {
            const windowRefId = element.getAttribute('data-window-ref-id');
            const windowRef = this.windowRefs
                .find((currWindowRef) => currWindowRef.id === windowRefId);

            this.updateWindowRefHidesIntoCoordinate(windowRef, element);
        });
    }

    private updateWindowRefHidesIntoCoordinate(windowRef: DynamicWindowRef, windowRefElement: HTMLElement): void {
        const { x, y } = windowRefElement.getBoundingClientRect();
        const cssX = `${x}px`;
        const cssY = `${y}px`;

        if (windowRef.config.hidesInto?.x !== cssX || windowRef.config.hidesInto?.y !== cssY) {
            windowRef.updateConfig({
                hidesInto: {
                    x: cssX,
                    y: cssY
                }
            });
        }
    }
}
