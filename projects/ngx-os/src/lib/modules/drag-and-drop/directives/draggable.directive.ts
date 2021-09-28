import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { isNil } from '@lib-helpers';
import { DraggerConfig } from '../classes';
import { BaseDragStrategy } from '../classes/base-drag.strategy';
import { DragStrategyFactory } from '../classes/drag-strategy.factory';
import { IDraggerParams, IDragInfo } from '../interfaces';

@Directive({
    selector: '[os-draggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
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

    public get shiftX(): number {
        return this._shiftX;
    }

    public get shiftY(): number {
        return this._shiftY;
    }

    public get draggableElement(): HTMLElement {
        return this._draggableElement;
    }

    public get movableElement(): HTMLElement {
        return this._movableElement;
    }

    private _shiftX: number;
    private _shiftY: number;
    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;
    private _config: DraggerConfig = new DraggerConfig();
    private _strategy: BaseDragStrategy;

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        this.initStrategy();
    }

    public ngOnDestroy(): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    public updateMovableElementPosition(event: MouseEvent): void {
        if (this._movableElement && this.config.isAllowMoveElement) {
            this._strategy.updateElementPosition(event);
        }
    }

    private initStrategy(): void {
        this._strategy = DragStrategyFactory.create(this._config.strategy, this);
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
        if (!isNil(this.config.shiftX)) {
            this._shiftX = this.config.shiftX;
        } else {
            this._shiftX = mouseEvent.clientX - draggableElementDomRect.left + scrollX;
        }
    }

    private setShiftY({ mouseEvent, draggableElementDomRect }: IDragInfo): void {
        if (!isNil(this.config.shiftY)) {
            this._shiftY = this.config.shiftY;
        } else {
            this._shiftY = mouseEvent.clientY - draggableElementDomRect.top + scrollY;
        }
    }

    private getIsAvailableDragInteraction(event: MouseEvent): boolean {
        const childElementsBlackList = this.config.childElementsBlackList || [];

        return !!(
            this.config.isEnabled
            ||
            this.config.allowedMouseButtons
            ||
            this.config.allowedMouseButtons.includes(event.button)
            ||
            !childElementsBlackList.includes(event.target as HTMLElement)
        );
    }
}
