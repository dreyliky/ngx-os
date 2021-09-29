import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { BaseDragStrategy, DraggerConfig, DragStrategyFactory } from '../classes';
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

    public get draggableElement(): HTMLElement {
        return this._draggableElement;
    }

    public get movableElement(): HTMLElement {
        return this._movableElement;
    }

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;
    private _config: DraggerConfig = new DraggerConfig();
    private _strategy: BaseDragStrategy;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        this._strategy = DragStrategyFactory.create(this._config.strategy, this);
    }

    public ngOnDestroy(): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    public updateMovableElementPosition(event: MouseEvent): void {
        if (this._movableElement && this.config.isAllowMoveElement) {
            this._strategy.updateElementPosition(event);
        }
    }

    private initDraggableElement(): void {
        this._draggableElement?.removeEventListener('mousedown', this.elementMouseDownHandler);

        this._draggableElement = (this.config?.draggableElement ?? this.hostRef.nativeElement);

        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
    }

    private initMovableElement(): void {
        this._movableElement = this.config?.movableElement ?? this.hostRef.nativeElement;
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
        if (!this.isDragAllowed(event)) {
            return;
        }

        const dragInfo = this.getDragInfo(event);

        this.osBeforeDragStart.emit(dragInfo);
        this._strategy.registerMouseDown(dragInfo);
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

    private getDragInfo(mouseEvent: MouseEvent): IDragInfo {
        return {
            movableElement: this._movableElement,
            mouseEvent
        };
    }

    private isDragAllowed(event: MouseEvent): boolean {
        return (
            this.config.isEnabled
            ||
            this.config.allowedMouseButtons?.includes(event.button)
            ||
            !this.config.childElementsBlackList?.includes(event.target as HTMLElement)
        );
    }
}
