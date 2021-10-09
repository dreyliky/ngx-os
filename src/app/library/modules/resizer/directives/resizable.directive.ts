import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommonCssClassEnum as CommonCssClass } from '../../../core';
import { BaseResizer, ResizerConfig, ResizerFactory } from '../classes';
import { ResizerCssClassEnum as CssClass, ResizerElementTagEnum as ElementTag, ResizerEnum } from '../enums';
import { IResizeInfo, IResizerConfig } from '../interfaces';

/** @dynamic */
// See: https://github.com/angular/angular/issues/20351
@Directive({
    selector: '[os-resizable]'
})
export class ResizableDirective implements AfterViewInit, OnDestroy {
    /** Configuration of resizing */
    @Input('os-resizable')
    public set config(config: IResizerConfig) {
        this.updateConfigWithoutChanges(config);
        this._whenViewInit$
            .pipe(first())
            .subscribe(() => {
                this.initResizableElement();
                this.updateResizersWrapperDomPlacement();
                this.updateResizersWrapperActivity();
                this.initResizerElements();
            });
    }

    /** Configuration of resizing */
    public get config(): IResizerConfig {
        return this._config;
    }

    /** Fires when the resizable element init */
    @Output()
    public osResizableElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    /** Fires when the resizers wrapper element init */
    @Output()
    public osResizersWrapperElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    /** Fires before resize start. Immediately upon the `mousedown` event triggering, but only if resizing is allowed */
    @Output()
    public osBeforeResizeStart: EventEmitter<IResizeInfo> = new EventEmitter();

    /** Fires after the `osBeforeResizeStart`, but when all internal handlers registered and prepared */
    @Output()
    public osResizeStart: EventEmitter<IResizeInfo> = new EventEmitter();

    /** Fires when the `mousemove` is called */
    @Output()
    public osResizing: EventEmitter<IResizeInfo> = new EventEmitter();

    /** Fires when the `mousemove` is called as a macro task with minimum delay */
    @Output()
    public osAfterResizing: EventEmitter<IResizeInfo> = new EventEmitter();

    /** Fires when the `mouseup` is called and after all internal handlers removed */
    @Output()
    public osResizeEnd: EventEmitter<IResizeInfo> = new EventEmitter();

    private _resizableElement: HTMLElement;
    private _resizersWrapperElement: HTMLElement;
    private _resizerInstance: BaseResizer;
    private _config = new ResizerConfig();
    private _whenViewInit$ = new ReplaySubject();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        this.initResizersWrapperElement();
        this._whenViewInit$.next();
    }

    public ngOnDestroy(): void {
        this.document.removeEventListener('mouseup', this.documentMouseUpHandler);
        this._whenViewInit$.complete();
    }

    /** Updates config without affecting any logic, like some internal initialization of different things */
    public updateConfigWithoutChanges(config: IResizerConfig): void {
        this._config = { ...this._config, ...config };
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
        this.config.allowedResizers.forEach((resizerName) => {
            const resizerElement = this.document.createElement(ElementTag.Resizer);

            resizerElement.classList.add(resizerName);
            resizerElement.addEventListener('mousedown', (event: MouseEvent) => {
                this.resizerMouseDownHandler(event, resizerName);
            });
            this._resizersWrapperElement.appendChild(resizerElement);
        });
    }

    private updateResizersWrapperDomPlacement(): void {
        if (this._resizersWrapperElement && (this._resizersWrapperElement.parentElement !== this._resizableElement)) {
            this._resizersWrapperElement.remove();

            this._resizableElement.appendChild(this._resizersWrapperElement);
        }
    }

    private updateResizersWrapperActivity(): void {
        const classList = this._resizersWrapperElement.classList;

        (this.config.isEnabled) ? classList.add(CommonCssClass.Active) : classList.remove(CommonCssClass.Active);
    }

    private resizerMouseDownHandler(event: MouseEvent, resizerId: ResizerEnum): void {
        if (!this.isResizeAllowed(event)) {
            return;
        }

        const resizeInfo = this.getResizeInfo(event);
        this._resizerInstance = ResizerFactory.create(resizerId, this);

        this.osBeforeResizeStart.emit(resizeInfo);
        event.preventDefault();
        this._resizerInstance.init(this._resizableElement, event);
        this._resizableElement.classList.add(CssClass.Resizing);
        this.document.addEventListener('mousemove', this.documentMouseMoveHandler);
        this.document.addEventListener('mouseup', this.documentMouseUpHandler);
        this.osResizeStart.emit(resizeInfo);
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        this._resizerInstance.resizeElement(event);
        this.osResizing.emit(this.getResizeInfo(event));
        setTimeout(() => this.osAfterResizing.emit(this.getResizeInfo(event)));
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        this._resizableElement.classList.remove(CssClass.Resizing);
        this.document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        this.osResizeEnd.emit(this.getResizeInfo(event));
    }

    private getResizeInfo(originalEvent: MouseEvent): IResizeInfo {
        return {
            resizableElement: this._resizableElement,
            originalEvent
        };
    }

    private isResizeAllowed(event: MouseEvent): boolean {
        return (
            this.config.isEnabled &&
            this.config.allowedMouseButtons?.includes(event.button)
        );
    }
}
