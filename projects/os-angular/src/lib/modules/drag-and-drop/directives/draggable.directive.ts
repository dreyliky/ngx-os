import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DraggerConfig } from '../classes';
import { DragInfo } from '../interfaces/drag-info.interface';

@Directive({
    selector: '[os-draggable]'
})
export class OsDraggableDirective implements OnDestroy {
    @Input('os-draggable')
    public set draggerConfig(config: DraggerConfig) {
        this._draggerConfig = { ...this._draggerConfig, ...config };
        console.log(this._draggerConfig);

        this.initMovableElement();
        this.initDraggableElement();
    }

    public get draggerConfig(): DraggerConfig {
        return this._draggerConfig;
    }

    @Output()
    public osBeforeDragStart = new EventEmitter<DragInfo>();

    @Output()
    public osDragStart = new EventEmitter<DragInfo>();

    @Output()
    public osDragEnd = new EventEmitter<DragInfo>();

    @Output()
    public osDragging = new EventEmitter<DragInfo>();

    @Output()
    public osAfterDragging = new EventEmitter<DragInfo>();

    private shiftX: number;
    private shiftY: number;

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;

    private _draggerConfig: DraggerConfig = new DraggerConfig();

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnDestroy(): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    public updateMovableElementPosition(event: MouseEvent): void {
        if (this._movableElement && this.draggerConfig.isAllowMoveElement) {
            this._movableElement.style.left = `${event.clientX - this.shiftX}px`;
            this._movableElement.style.top = `${event.clientY - this.shiftY}px`;
        }
    }

    private initDraggableElement(): void {
        this._draggableElement?.removeEventListener('mousedown', this.elementMouseDownHandler);

        if (this.draggerConfig?.draggableElement) {
            this._draggableElement = this.draggerConfig.draggableElement;
        } else {
            this._draggableElement = this.element.nativeElement;
        }

        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
    }

    private initMovableElement(): void {
        if (this.draggerConfig?.movableElement) {
            this._movableElement = this.draggerConfig.movableElement;
        } else {
            this._movableElement = this.element.nativeElement;
        }
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
        const isDragAvailable = this.getIsAvailableDragInteraction(event);

        if (!isDragAvailable) {
            return;
        }

        const dragInfo = this.getDragInfo(event);

        this.osBeforeDragStart.emit(dragInfo);

        this.setShiftX(dragInfo);
        this.setShiftY(dragInfo);

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);

        this.osDragStart.emit(dragInfo);
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        this.updateMovableElementPosition(event);

        const dragInfo = this.getDragInfo(event);

        this.osDragging.emit(dragInfo);

        setTimeout(() => {
            const dragInfoAfter = this.getDragInfo(event);

            this.osAfterDragging.emit(dragInfoAfter);
        });
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        const dragInfo = this.getDragInfo(event);

        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        document.removeEventListener('mouseup', this.documentMouseUpHandler);

        this.osDragEnd.emit(dragInfo);
    }

    private getDragInfo(event: MouseEvent): DragInfo {
        return {
            draggableElementDomRect: this._movableElement.getBoundingClientRect(),
            mouseEvent: event
        };
    }

    private setShiftX({ mouseEvent, draggableElementDomRect }: DragInfo): void {
        if (typeof(this.draggerConfig.shiftX) === 'number') {
            this.shiftX = this.draggerConfig.shiftX;
        } else {
            this.shiftX = mouseEvent.clientX - draggableElementDomRect.left + pageXOffset;
        }
    }

    private setShiftY({ mouseEvent, draggableElementDomRect }: DragInfo): void {
        if (typeof(this.draggerConfig.shiftY) === 'number') {
            this.shiftY = this.draggerConfig.shiftY;
        } else {
            this.shiftY = mouseEvent.clientY - draggableElementDomRect.top + pageYOffset;
        }
    }

    private getIsAvailableDragInteraction(event: MouseEvent): boolean {
        const childElementsBlackList = this.draggerConfig.childElementsBlackList || [];

        if (
            !this.draggerConfig.isEnabled
            ||
            !this.draggerConfig.allowedMouseButtons
            ||
            !this.draggerConfig.allowedMouseButtons.includes(event.button)
            ||
            childElementsBlackList.includes(event.target as HTMLElement)
        ) {
            return false;
        }

        return true;
    }
}
