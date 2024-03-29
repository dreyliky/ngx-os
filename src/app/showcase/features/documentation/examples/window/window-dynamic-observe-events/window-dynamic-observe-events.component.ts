import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';
import { DYNAMIC_WINDOW_REF, DynamicWindowRef, DynamicWindowService } from 'ngx-os';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'showcase-window-dynamic-observe-events',
    templateUrl: './window-dynamic-observe-events.component.html',
    styleUrls: ['./window-dynamic-observe-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowDynamicObserveEventsComponent {
    constructor(
        private readonly dynamicWindow: DynamicWindowService
    ) {}

    public onOpenWindowButtonClick(): void {
        this.dynamicWindow.open(MyAppComponent);
    }
}

@Component({
    template: `
        Width: <b>{{ windowElement.clientWidth }}</b>;<br />
        Height: <b>{{ windowElement.clientHeight }}</b>;<br />
        X: <b>{{ windowElement.offsetLeft }}</b>;<br />
        Y: <b>{{ windowElement.offsetTop }}</b>;<br />
        Is Dragging: <b>{{ isDragging }}</b>;<br />
        Is Resizing: <b>{{ isResizing }}</b>;
    `
})
class MyAppComponent implements OnInit, OnDestroy {
    public get windowElement(): HTMLElement {
        return this.windowRef.windowElement;
    }

    public isDragging: boolean = false;
    public isResizing: boolean = false;

    private viewDestroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initWindowDragStartObserver();
        this.initWindowDraggingObserver();
        this.initWindowDragEndObserver();
        this.initWindowResizeStartObserver();
        this.initWindowResizingObserver();
        this.initWindowResizeEndObserver();
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    private initWindowDragStartObserver(): void {
        this.windowRef.draggableDirective.osDragStart
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.isDragging = true;

                this.changeDetector.detectChanges();
            });
    }

    private initWindowDraggingObserver(): void {
        this.windowRef.draggableDirective.osDragging
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.changeDetector.detectChanges());
    }

    private initWindowDragEndObserver(): void {
        this.windowRef.draggableDirective.osDragEnd
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.isDragging = false;

                this.changeDetector.detectChanges();
            });
    }

    private initWindowResizeStartObserver(): void {
        this.windowRef.resizableDirective.osResizeStart
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.isResizing = true;

                this.changeDetector.detectChanges();
            });
    }

    private initWindowResizingObserver(): void {
        this.windowRef.resizableDirective.osResizing
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.changeDetector.detectChanges());
    }

    private initWindowResizeEndObserver(): void {
        this.windowRef.resizableDirective.osResizeEnd
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.isResizing = false;

                this.changeDetector.detectChanges();
            });
    }
}
