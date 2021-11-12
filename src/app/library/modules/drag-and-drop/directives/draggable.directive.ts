import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Output
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { BaseDragStrategyImpl, DraggerConfigModel, DragStrategyFactory } from '../classes';
import { DraggerCssClassEnum as CssClass } from '../enums';
import { DraggerConfig, DragInfo } from '../interfaces';

/** Makes HTML element draggable by mouse cursor */
@Directive({
    selector: '[os-draggable]'
})
export class DraggableDirective implements OnChanges, AfterViewInit, OnDestroy {
    /** Configuration of dragging */
    @Input('os-draggable')
    public parameters: DraggerConfig;

    /** Fires when the draggable element init */
    @Output()
    public osDraggableElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    /** Fires when the movable element init */
    @Output()
    public osMovableElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    /** Fires when calls mousedown handler over draggableElement */
    @Output()
    public osDragStart: EventEmitter<DragInfo> = new EventEmitter();

    /** Fires when the `mousemove` is called */
    @Output()
    public osDragging: EventEmitter<DragInfo> = new EventEmitter();

    /** Fires when the `mouseup` is called and after all internal handlers removed */
    @Output()
    public osDragEnd: EventEmitter<DragInfo> = new EventEmitter();

    /** Target draggable HTML element */
    public get draggableElement(): HTMLElement {
        return this._draggableElement;
    }

    /** Target movable HTML element */
    public get movableElement(): HTMLElement {
        return this._movableElement;
    }

    /** Target dragging strategy */
    public get strategy(): BaseDragStrategyImpl {
        return this._strategy;
    }

    /** Configuration of dragging */
    public get config(): DraggerConfig {
        return this._config;
    }

    /** @internal */
    public get whenViewInit$(): Observable<unknown> {
        return this._whenViewInit$.asObservable();
    }

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;
    private _strategy: BaseDragStrategyImpl;
    private _config = new DraggerConfigModel();
    private _whenViewInit$ = new ReplaySubject();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnChanges(): void {
        this.update();
        console.log('changes');
    }

    public ngAfterViewInit(): void {
        this._whenViewInit$.next();
    }

    public ngOnDestroy(): void {
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
        this._whenViewInit$.complete();
    }

    /** Updates config without affecting any logic, like some internal initialization of different things */
    public updateConfigWithoutChanges(config: DraggerConfigModel): void {
        this._config = { ...this._config, ...config };
    }

    private update(): void {
        this.updateConfigWithoutChanges(this.parameters);
        this.initMovableElement();
        this.initDraggableElement();
        this.initStrategy();
    }

    private updateMovableElementPosition(event: MouseEvent): void {
        if (this._movableElement && this.config.isAllowMoveElement) {
            this._strategy.updateElementPosition(event);
        }
    }

    private initStrategy(): void {
        if (DragStrategyFactory.isDifferent(this._config.strategy, this)) {
            this._strategy = DragStrategyFactory.create(this._config.strategy, this);
        }
    }

    private initDraggableElement(): void {
        this._draggableElement?.removeEventListener('mousedown', this.elementMouseDownHandler);
        this._draggableElement?.classList.remove(CssClass.Draggable);

        this._draggableElement = (this.config?.draggableElement ?? this.hostRef.nativeElement);

        this._draggableElement?.classList.add(CssClass.Draggable);
        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
        this.osDraggableElementInit.emit(this._draggableElement);
    }

    private initMovableElement(): void {
        this._movableElement?.classList.remove(CssClass.Movable);

        this._movableElement = this.config?.movableElement ?? this.hostRef.nativeElement;

        this._movableElement?.classList.add(CssClass.Movable);
        this.osMovableElementInit.emit(this._movableElement);
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
        if (!this.isDragAllowed(event)) {
            return;
        }

        const dragInfo = this.getDragInfo(event);

        this.osDragStart.emit(dragInfo);
        this._movableElement.classList.add(CssClass.Dragging);
        this._strategy.registerMouseDown(dragInfo);
        this.document.addEventListener('mousemove', this.documentMouseMoveHandler);
        this.document.addEventListener('mouseup', this.documentMouseUpHandler);
    };

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        const dragInfo = this.getDragInfo(event);

        if (this.config.mouseMoveHandler) {
            this.config.mouseMoveHandler(dragInfo);
        } else {
            this.updateMovableElementPosition(event);
        }

        this.osDragging.emit(this.getDragInfo(event));
    };

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        this._movableElement.classList.remove(CssClass.Dragging);
        this.document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        this.document.removeEventListener('mouseup', this.documentMouseUpHandler);
        this.osDragEnd.emit(this.getDragInfo(event));
    };

    private getDragInfo(originalEvent: MouseEvent): DragInfo {
        return {
            movableElement: this._movableElement,
            originalEvent
        };
    }

    private isDragAllowed(event: MouseEvent): boolean {
        return (
            this.config.isEnabled &&
            this.config.allowedMouseButtons?.includes(event.button) &&
            !this.config.childElementsBlackList?.includes(event.target as HTMLElement)
        );
    }
}
