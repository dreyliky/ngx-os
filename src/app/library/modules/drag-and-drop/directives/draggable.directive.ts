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
import { ɵPointerHelper } from '../../../core';
import { ɵBaseDragStrategyImpl, ɵDraggerConfigModel, ɵDragStrategyFactory } from '../classes';
import { ɵDraggerCssClassEnum as CssClass } from '../enums';
import { DraggerConfig, DragInfo } from '../interfaces';

/** Makes HTML element draggable by mouse */
@Directive({
    selector: '[osDraggable]',
    exportAs: 'osDraggable'
})
export class DraggableDirective implements OnChanges, AfterViewInit, OnDestroy {
    /** Configuration of dragging */
    @Input('osDraggable')
    public parameters: DraggerConfig | undefined | '' ;

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
    public get strategy(): ɵBaseDragStrategyImpl {
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
    private _strategy: ɵBaseDragStrategyImpl;
    private _config = new ɵDraggerConfigModel();
    private _whenViewInit$ = new ReplaySubject<true>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnChanges(): void {
        this.update();
    }

    public ngAfterViewInit(): void {
        this._whenViewInit$.next(true);
    }

    public ngOnDestroy(): void {
        this._draggableElement.removeEventListener('mousedown', this.onPointerDown);
        this._whenViewInit$.complete();
    }

    /** Updates config without affecting any logic, like some internal initialization of different things */
    public updateConfigWithoutChanges(config: DraggerConfig): void {
        this._config = { ...this._config, ...config };
    }

    private update(): void {
        this.updateConfigWithoutChanges(this.parameters as DraggerConfig);
        this.initMovableElement();
        this.initDraggableElement();
        this.initStrategy();
    }

    private updateMovableElementPosition(event: PointerEvent | TouchEvent): void {
        if (this._movableElement && this.config.isAllowMoveElement) {
            this._strategy.updateElementPosition(event);
        }
    }

    private initStrategy(): void {
        if (ɵDragStrategyFactory.isDifferent(this._config.strategy, this)) {
            this._strategy = ɵDragStrategyFactory.create(this._config.strategy, this);
        }
    }

    private initDraggableElement(): void {
        this._draggableElement?.removeEventListener('mousedown', this.onPointerDown);
        this._draggableElement?.removeEventListener('touchstart', this.onPointerDown);
        this._draggableElement?.classList.remove(CssClass.Draggable);

        this._draggableElement = (this.config?.draggableElement ?? this.hostRef.nativeElement);

        this._draggableElement?.classList.add(CssClass.Draggable);
        this._draggableElement.addEventListener('mousedown', this.onPointerDown);
        this._draggableElement.addEventListener('touchstart', this.onPointerDown);
        this.osDraggableElementInit.emit(this._draggableElement);
    }

    private initMovableElement(): void {
        this._movableElement?.classList.remove(CssClass.Movable);

        this._movableElement = this.config?.movableElement ?? this.hostRef.nativeElement;

        this._movableElement?.classList.add(CssClass.Movable);
        this.osMovableElementInit.emit(this._movableElement);
    }

    private readonly onPointerDown = (event: PointerEvent | TouchEvent): void => {
        if (!this.isDragAllowed(event)) {
            return;
        }

        const dragInfo = this.getDragInfo(event);

        event.preventDefault();
        this.osDragStart.emit(dragInfo);
        this._movableElement.classList.add(CssClass.Dragging);
        this._strategy.registerMouseDown(dragInfo);
        this._draggableElement.addEventListener('touchmove', this.onPointerMove);
        this._draggableElement.addEventListener('touchend', this.onPointerUp);
        this.document.addEventListener('mousemove', this.onPointerMove);
        this.document.addEventListener('mouseup', this.onPointerUp);
    };

    private readonly onPointerMove = (event: PointerEvent | TouchEvent): void => {
        const dragInfo = this.getDragInfo(event);

        event.preventDefault();

        if (this.config.mouseMoveHandler) {
            this.config.mouseMoveHandler(dragInfo);
        } else {
            this.updateMovableElementPosition(event);
        }

        this.osDragging.emit(this.getDragInfo(event));
    };

    private readonly onPointerUp = (event: PointerEvent | TouchEvent): void => {
        event.preventDefault();
        this._movableElement.classList.remove(CssClass.Dragging);
        this._draggableElement.removeEventListener('touchmove', this.onPointerMove);
        this._draggableElement.removeEventListener('touchend', this.onPointerUp);
        this.document.removeEventListener('mousemove', this.onPointerMove);
        this.document.removeEventListener('mouseup', this.onPointerUp);
        this.osDragEnd.emit(this.getDragInfo(event));
    };

    private getDragInfo(originalEvent: PointerEvent | TouchEvent): DragInfo {
        return {
            movableElement: this._movableElement,
            originalEvent
        };
    }

    private isDragAllowed(event: PointerEvent | TouchEvent): boolean {
        const isMouseButtonAvailable = ɵPointerHelper.isPointerEvent(event) ?
            this.config.allowedMouseButtons?.includes(event.button) :
            (event.touches.length === 1);

        return (
            this.config.isEnabled &&
            isMouseButtonAvailable &&
            !this.config.childElementsBlackList?.includes(event.target as HTMLElement)
        );
    }
}
