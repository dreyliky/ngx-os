import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DraggerConfig } from '../classes';
import { DragInfo } from '../interfaces/drag-info.interface';

declare var getEventListeners;

@Directive({
    selector: '[os-draggable]'
})
export class OsDraggableDirective implements OnInit, OnDestroy {

    @Input('os-draggable')
    public set draggerConfig (config: DraggerConfig) {
        this._draggerConfig = { ...this._draggerConfig, ...config };

        this.initMovableElement();
        this.initDraggableElement();
    }

    public get draggerConfig (): DraggerConfig {
        return this._draggerConfig;
    }

    @Output()
    public OnBeforeDragStart = new EventEmitter<DragInfo>();

    @Output()
    public OnDragStart = new EventEmitter<DragInfo>();

    @Output()
    public OnDragEnd = new EventEmitter<DragInfo>();

    @Output()
    public OnDragging = new EventEmitter<DragInfo>();

    @Output()
    public OnAfterDragging = new EventEmitter<DragInfo>();

    private shiftX: number;
    private shiftY: number;

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;

    private _draggerConfig: DraggerConfig = new DraggerConfig();

    constructor (
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit (): void {}

    public ngOnDestroy (): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    public updateMovableElementPosition (event: MouseEvent): void {
        if (this._movableElement && this.draggerConfig.isAllowMoveElement) {
            this._movableElement.style.left = `${event.pageX - this.shiftX}px`;
            this._movableElement.style.top  = `${event.pageY - this.shiftY}px`;
        }
    }

    private initDraggableElement (): void {
        this._draggableElement?.removeEventListener('mousedown', this.elementMouseDownHandler);

        if (this.draggerConfig?.draggableElement) {
            this._draggableElement = this.draggerConfig.draggableElement;
        } else {
            this._draggableElement = this.element.nativeElement;
        }

        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
    }

    private initMovableElement (): void {
        if (this.draggerConfig?.movableElement) {
            this._movableElement = this.draggerConfig.movableElement;
        } else {
            this._movableElement = this.element.nativeElement;
        }
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
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
            return;
        }

        const dragInfo = this.getDragInfo(event);

        this.OnBeforeDragStart.emit(dragInfo);

        this.setShiftX(dragInfo, event);
        this.setShiftY(dragInfo, event);

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);

        this.OnDragStart.emit(dragInfo);
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        this.updateMovableElementPosition(event);

        const dragInfo = this.getDragInfo(event);

        this.OnDragging.emit(dragInfo);

        setTimeout(() => {
            const dragInfoAfter = this.getDragInfo(event);

            this.OnAfterDragging.emit(dragInfoAfter);
        });
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        const dragInfo = this.getDragInfo(event);

        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        document.removeEventListener('mouseup', this.documentMouseUpHandler);

        this.OnDragEnd.emit(dragInfo);
    }

    private getDragInfo (event: MouseEvent): DragInfo {
        const box = this._movableElement.getBoundingClientRect();

        return {
            draggableElementDomRect: box,
            mouseEvent: event
        };
    }

    private setShiftX (dragInfo: DragInfo, event: MouseEvent): void {
        if (typeof(this.draggerConfig.shiftX) === 'number') {
            this.shiftX = this.draggerConfig.shiftX;
        } else {
            this.shiftX = event.pageX - dragInfo.draggableElementDomRect.left + pageXOffset;
        }
    }

    private setShiftY (dragInfo: DragInfo, event: MouseEvent): void {
        if (typeof(this.draggerConfig.shiftY) === 'number') {
            this.shiftY = this.draggerConfig.shiftY;
        } else {
            this.shiftY = event.pageY - dragInfo.draggableElementDomRect.top + pageYOffset;
        }
    }

}
