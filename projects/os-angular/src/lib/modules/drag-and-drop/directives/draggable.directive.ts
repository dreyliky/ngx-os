import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DraggerConfig } from '../classes';
import { DragInfo } from '../interfaces/drag-info.interface';

@Directive({
    selector: '[os-draggable]'
})
export class OsDraggableDirective implements OnInit, OnDestroy {

    @Input('os-draggable')
    public set draggerConfig (config: DraggerConfig) {
        this._draggerConfig = { ...this._draggerConfig, ...config };
    }

    @Output()
    public OnDraggableElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public OnMovableElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public OnBeforeDragStart = new EventEmitter<DragInfo>();

    @Output()
    public OnDragStart = new EventEmitter<DragInfo>();

    @Output()
    public OnDragEnd = new EventEmitter<DragInfo>();

    @Output()
    public OnDragging = new EventEmitter<DragInfo>();

    private shiftX: number;
    private shiftY: number;

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;

    private _draggerConfig: DraggerConfig = new DraggerConfig();

    constructor (
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit (): void {
        this.initDraggableElement();
        this.initMovableElement();

        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
    }

    public ngOnDestroy (): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    private initDraggableElement (): void {
        if (this._draggerConfig?.draggableElementSelector) {
            this._draggableElement = this.element.nativeElement.querySelector(this._draggerConfig.draggableElementSelector);
        } else {
            this._draggableElement = this.element.nativeElement;
        }

        this.OnDraggableElementInit.emit(this._draggableElement);
    }

    private initMovableElement (): void {
        if (this._draggerConfig?.movableElementSelector) {
            this._movableElement = this.element.nativeElement.querySelector(this._draggerConfig.movableElementSelector);
        } else {
            this._movableElement = this.element.nativeElement;
        }

        this.OnMovableElementInit.emit(this._movableElement);
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
        if (
            !this._draggerConfig.isEnabled
            ||
            !this._draggerConfig.allowedMouseButtons
            ||
            !this._draggerConfig.allowedMouseButtons.includes(event.button)
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
    }

    private updateMovableElementPosition (event: MouseEvent): void {
        if (this._movableElement && this._draggerConfig.isAllowMoveElement) {
            this._movableElement.style.left = `${event.pageX - this.shiftX}px`;
            this._movableElement.style.top  = `${event.pageY - this.shiftY}px`;
        }
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
        if (typeof(this._draggerConfig.shiftX) === 'number') {
            this.shiftX = this._draggerConfig.shiftX;
        } else {
            this.shiftX = event.pageX - dragInfo.draggableElementDomRect.left + pageXOffset;
        }
    }

    private setShiftY (dragInfo: DragInfo, event: MouseEvent): void {
        if (typeof(this._draggerConfig.shiftY) === 'number') {
            this.shiftY = this._draggerConfig.shiftY;
        } else {
            this.shiftY = event.pageY - dragInfo.draggableElementDomRect.top + pageYOffset;
        }
    }

}
