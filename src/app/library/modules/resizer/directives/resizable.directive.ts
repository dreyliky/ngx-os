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
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ɵCommonCssClassEnum as CommonCssClass, ɵPointerHelper } from '../../../core';
import { ɵBaseResizer, ɵResizerConfigModel, ɵResizerFactory } from '../classes';
import { ɵRESIZERS_ARRAY } from '../data';
import {
    ResizerEnum, ɵResizerCssClassEnum as CssClass, ɵResizerElementTagEnum as ElementTag
} from '../enums';
import { ResizeInfo, ResizerConfig } from '../interfaces';

@Directive({
    selector: '[osResizable]',
    exportAs: 'osResizable',
    providers: [
        ɵResizerFactory
    ]
})
export class ResizableDirective implements OnChanges, AfterViewInit, OnDestroy {
    /** Configuration of resizing */
    @Input('osResizable')
    public parameters: ResizerConfig | undefined | '';

    /** Fires when the resizable element init */
    @Output()
    public osResizableElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    /** Fires when the resizers wrapper element init */
    @Output()
    public osResizersWrapperElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    /** Fires when calls mousedown handler over resizableElement */
    @Output()
    public osResizeStart: EventEmitter<ResizeInfo> = new EventEmitter();

    /** Fires when the `mousemove` is called */
    @Output()
    public osResizing: EventEmitter<ResizeInfo> = new EventEmitter();

    /** Fires when the `mouseup` is called and after all internal handlers removed */
    @Output()
    public osResizeEnd: EventEmitter<ResizeInfo> = new EventEmitter();

    /** Target resizable HTML element */
    public get resizableElement(): HTMLElement {
        return this._resizableElement;
    }

    /** Target resizer */
    public get resizer(): ɵBaseResizer {
        return this._resizer;
    }

    /** Configuration of resizing */
    public get config(): ɵResizerConfigModel {
        return this._config;
    }

    private _resizableElement: HTMLElement;
    private _resizersWrapperElement: HTMLElement;
    private _resizer: ɵBaseResizer;
    private _config = new ɵResizerConfigModel();
    private _whenViewInit$ = new ReplaySubject<true>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly resizerFactory: ɵResizerFactory
    ) {}

    public ngOnChanges(): void {
        this.updateConfigWithoutChanges(this.parameters as ResizerConfig);
        this.onConfigChanged();
    }

    public ngAfterViewInit(): void {
        this.initResizersWrapperElement();
        this._whenViewInit$.next(true);
    }

    public ngOnDestroy(): void {
        this.document.removeEventListener('mouseup', this.onPointerUp);
        this._whenViewInit$.complete();
    }

    /** Updates config without affecting any logic, like some internal initialization of different things */
    public updateConfigWithoutChanges(config: ResizerConfig): void {
        this._config = { ...this._config, ...config };
    }

    private onConfigChanged(): void {
        this._whenViewInit$
            .pipe(first())
            .subscribe(() => {
                this.initResizableElement();
                this.updateResizersWrapperDomPlacement();
                this.updateResizersWrapperActivity();
                this.initResizerElements();
            });
    }

    private initResizableElement(): void {
        this._resizableElement?.classList.remove(CssClass.Resizable);

        this._resizableElement = this.config?.targetElement ?? this.hostRef.nativeElement;

        this._resizableElement?.classList.add(CssClass.Resizable);
        this.osResizableElementInit.emit(this._resizableElement);
    }

    private initResizersWrapperElement(): void {
        this._resizersWrapperElement = this.document.createElement(ElementTag.Resizers);

        this.osResizersWrapperElementInit.emit(this._resizersWrapperElement);
    }

    private initResizerElements(): void {
        ɵRESIZERS_ARRAY.forEach((resizer) => {
            const targetExisting = this._resizersWrapperElement.querySelector(`.${resizer}`);
            const isTargetAllowed = this.config.allowedResizers.includes(resizer);

            if (targetExisting && !isTargetAllowed) {
                // If target (already existing) resizer became forbidden
                this._resizersWrapperElement.removeChild(targetExisting);
            } else if (!targetExisting && isTargetAllowed) {
                // If target resizer absent but became allowed
                this.createResizer(resizer);
            }
        });
    }

    private createResizer(resizer: ResizerEnum): void {
        const resizerElement = this.document.createElement(ElementTag.Resizer);

        const pointerDownHandler = (event: PointerEvent | TouchEvent): void => {
            this.onPointerDown(event, resizer);
        };

        resizerElement.classList.add(resizer);
        resizerElement.addEventListener('mousedown', pointerDownHandler);
        resizerElement.addEventListener('touchstart', pointerDownHandler);
        resizerElement.addEventListener('touchmove', this.onPointerMove, { passive: false });
        resizerElement.addEventListener('touchend', this.onPointerUp);
        this._resizersWrapperElement.appendChild(resizerElement);
    }

    private updateResizersWrapperDomPlacement(): void {
        if (
            this._resizersWrapperElement &&
            (this._resizersWrapperElement.parentElement !== this._resizableElement)
        ) {
            this._resizersWrapperElement.remove();

            this._resizableElement.appendChild(this._resizersWrapperElement);
        }
    }

    private updateResizersWrapperActivity(): void {
        const classList = this._resizersWrapperElement.classList;
        const action: keyof DOMTokenList = (this.config.isEnabled) ? 'add' : 'remove';

        classList[action](CommonCssClass.Active);
    }

    private readonly onPointerDown = (
        event: PointerEvent | TouchEvent,
        resizerId: ResizerEnum
    ): void => {
        if (!this.isResizeAllowed(event)) {
            return;
        }

        const resizeInfo = this.getResizeInfo(event);
        this._resizer = this.resizerFactory.create(resizerId, this);

        this.osResizeStart.emit(resizeInfo);
        this._resizer.init(this._resizableElement, event);
        this._resizableElement.classList.add(CssClass.Resizing);
        this.document.addEventListener('mousemove', this.onPointerMove);
        this.document.addEventListener('mouseup', this.onPointerUp);
    };

    private readonly onPointerMove = (event: PointerEvent | TouchEvent): void => {
        const resizeInfo = this.getResizeInfo(event);

        if (this.config.mouseMoveHandler) {
            this.config.mouseMoveHandler(resizeInfo);
        } else {
            this._resizer.resizeElement(event);
        }

        event.stopPropagation();

        if (event.cancelable) {
            event.preventDefault();
        }
        this.osResizing.emit(resizeInfo);
    };

    private readonly onPointerUp = (event: PointerEvent | TouchEvent): void => {
        this._resizableElement.classList.remove(CssClass.Resizing);
        this.document.removeEventListener('mousemove', this.onPointerMove);
        this.document.addEventListener('mouseup', this.onPointerUp);
        event.stopPropagation();
        this.osResizeEnd.emit(this.getResizeInfo(event));
    };

    private getResizeInfo(originalEvent: PointerEvent | TouchEvent): ResizeInfo {
        return {
            resizableElement: this._resizableElement,
            originalEvent
        };
    }

    private isResizeAllowed(event: PointerEvent | TouchEvent): boolean {
        const isMouseButtonAvailable = ɵPointerHelper.isPointerEvent(event) ?
            this.config.allowedMouseButtons?.includes(event.button) :
            (event.touches.length === 1);

        return (this.config.isEnabled && isMouseButtonAvailable);
    }
}
