import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
    DragInfo,
    DragStrategyByAxisProperties,
    DynamicWindowRef,
    DynamicWindowService,
    DYNAMIC_WINDOW_REF
} from 'ngx-os';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'showcase-window-dynamic-custom-dragging-logic',
    templateUrl: './window-dynamic-custom-dragging-logic.component.html',
    styleUrls: ['./window-dynamic-custom-dragging-logic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowDynamicCustomDraggingLogicComponent {
    constructor(
        private readonly dynamicWindow: DynamicWindowService
    ) {}

    public onOpenWindowButtonClick(): void {
        this.dynamicWindow.open(MyAppComponent, {
            isAllowHide: false,
            isExitFullscreenByDragTitleBar: false,
            allowedResizers: []
        });
    }
}

@Component({
    template: `
        <b>
            Can't leave browser edges when dragging.<br /><br />
            Goes into fullscreen if leave it near the edges to the left or right.
        </b>
    `
})
class MyAppComponent implements OnInit, OnDestroy {
    private shiftX: number;
    private shiftY: number;

    private get dragStrategy(): DragStrategyByAxisProperties {
        return this.windowRef.draggableDirective.config.strategy as DragStrategyByAxisProperties;
    }

    private viewDestroy$ = new Subject<boolean>();

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef
    ) {}

    public ngOnInit(): void {
        this.initWindowDragStartObserver();
        this.initWindowDragEndObserver();
        this.windowRef.updateConfig({
            draggerConfig: {
                mouseMoveHandler: (event) => {
                    this.calculateWindowPositionX(event);
                    this.calculateWindowPositionY(event);
                }
            }
        });
    }

    public ngOnDestroy(): void {
        this.viewDestroy$.next(true);
        this.viewDestroy$.complete();
    }

    private initWindowDragStartObserver(): void {
        this.windowRef.draggableDirective.osDragStart
            .pipe(takeUntil(this.viewDestroy$))
            .subscribe(({ originalEvent, movableElement }) => {
                this.shiftX = (PointerHelper.getClientX(originalEvent) - movableElement.offsetLeft);
                this.shiftY = (PointerHelper.getClientY(originalEvent) - movableElement.offsetTop);
            });
    }

    private initWindowDragEndObserver(): void {
        this.windowRef.draggableDirective.osDragEnd
            .pipe(takeUntil(this.viewDestroy$))
            .subscribe(({ movableElement }) => this.onDragEnd(movableElement));
    }

    private calculateWindowPositionX(
        { originalEvent, movableElement }: DragInfo
    ): void {
        const clientX = PointerHelper.getClientX(originalEvent);
        const axisPropertyName = this.dragStrategy.xAxisLeftStyleProperty;

        if (this.shiftX > clientX) {
            movableElement.style.setProperty(axisPropertyName, '0px');
        } else if ((clientX - this.shiftX + movableElement.clientWidth) < innerWidth) {
            movableElement.style.setProperty(axisPropertyName, `${clientX - this.shiftX}px`);
        } else {
            const coordinate = `${innerWidth - movableElement.clientWidth}px`;

            movableElement.style.setProperty(axisPropertyName, coordinate);
        }
    }

    private calculateWindowPositionY(
        { originalEvent, movableElement }: DragInfo
    ): void {
        const clientY = PointerHelper.getClientY(originalEvent);
        const axisPropertyName = this.dragStrategy.yAxisTopStyleProperty;

        if (this.shiftY > clientY) {
            movableElement.style.setProperty(axisPropertyName, '0px');
        } else if ((clientY - this.shiftY + movableElement.clientHeight) < innerHeight) {
            movableElement.style.setProperty(axisPropertyName, `${clientY - this.shiftY}px`);
        } else {
            const coordinate = `${innerHeight - movableElement.clientHeight}px`;

            movableElement.style.setProperty(axisPropertyName, coordinate);
        }
    }

    private onDragEnd(windowElement: HTMLElement): void {
        if (
            windowElement.offsetLeft <= 0 ||
            (windowElement.offsetLeft + windowElement.clientWidth) >= innerWidth
        ) {
            this.windowRef.goFullscreen();
        }
    }
}

export abstract class PointerHelper {
    public static getClientX(event: PointerEvent | TouchEvent): number {
        if (this.isPointerEvent(event)) {
            return event.clientX;
        }

        return event.changedTouches[0].clientX;
    }

    public static getClientY(event: PointerEvent | TouchEvent): number {
        if (this.isPointerEvent(event)) {
            return event.clientY;
        }

        return event.changedTouches[0].clientY;
    }

    public static isPointerEvent(event: Event): event is PointerEvent {
        const mouseEvent = event as PointerEvent;

        return (mouseEvent.clientX !== undefined) && (mouseEvent.clientY !== undefined);
    }
}
