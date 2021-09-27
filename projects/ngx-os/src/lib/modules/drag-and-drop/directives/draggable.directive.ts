import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DraggerConfig } from '../classes';
import { IDraggerParams, IDragInfo } from '../interfaces';

@Directive({
    selector: '[os-draggable]'
})
export class DraggableDirective implements OnDestroy {
    @Input('os-draggable')
    public set config(draggerConfig: IDraggerParams) {
        this._config = { ...this._config, ...draggerConfig };

        this.initMovableElement();
        this.initDraggableElement();
    }

    public get config(): DraggerConfig {
        return this._config;
    }

    @Output()
    public osBeforeDragStart: EventEmitter<IDragInfo> = new EventEmitter();

    @Output()
    public osDragStart: EventEmitter<IDragInfo> = new EventEmitter();

    @Output()
    public osDragEnd: EventEmitter<IDragInfo> = new EventEmitter();

    @Output()
    public osDragging: EventEmitter<IDragInfo> = new EventEmitter();

    @Output()
    public osAfterDragging: EventEmitter<IDragInfo> = new EventEmitter();

    private shiftX: number;
    private shiftY: number;

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;

    private _config: DraggerConfig = new DraggerConfig();

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnDestroy(): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    public updateMovableElementPosition(event: MouseEvent): void {
        if (this._movableElement && this.config.isAllowMoveElement) {
            this._movableElement.style.setProperty(this.config.xAxisStyleProperty, `${event.clientX - this.shiftX}px`);
            this._movableElement.style.setProperty(this.config.yAxisStyleProperty, `${event.clientY - this.shiftY}px`);
        }
    }

    private initDraggableElement(): void {
        this._draggableElement?.removeEventListener('mousedown', this.elementMouseDownHandler);

        if (this.config?.draggableElement) {
            this._draggableElement = this.config.draggableElement;
        } else {
            this._draggableElement = this.element.nativeElement;
        }

        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
    }

    private initMovableElement(): void {
        if (this.config?.movableElement) {
            this._movableElement = this.config.movableElement;
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

    private getDragInfo(event: MouseEvent): IDragInfo {
        return {
            draggableElementDomRect: this._movableElement.getBoundingClientRect(),
            mouseEvent: event
        };
    }

    private setShiftX({ mouseEvent, draggableElementDomRect }: IDragInfo): void {
        if (typeof(this.config.shiftX) === 'number') {
            this.shiftX = this.config.shiftX;
        } else {
            this.shiftX = mouseEvent.clientX - draggableElementDomRect.left + pageXOffset;
        }
    }

    private setShiftY({ mouseEvent, draggableElementDomRect }: IDragInfo): void {
        if (typeof(this.config.shiftY) === 'number') {
            this.shiftY = this.config.shiftY;
        } else {
            this.shiftY = mouseEvent.clientY - draggableElementDomRect.top + pageYOffset;
        }
    }

    private getIsAvailableDragInteraction(event: MouseEvent): boolean {
        const childElementsBlackList = this.config.childElementsBlackList || [];

        if (
            !this.config.isEnabled
            ||
            !this.config.allowedMouseButtons
            ||
            !this.config.allowedMouseButtons.includes(event.button)
            ||
            childElementsBlackList.includes(event.target as HTMLElement)
        ) {
            return false;
        }

        return true;
    }
}
