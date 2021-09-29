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
import { BaseResizer, ResizerConfig, ResizerFactory } from '../classes';
import { ResizerCssClassEnum as CssClass, ResizerElementTagEnum as ElementTag, ResizerEnum } from '../enums';
import { IResizeInfo, IResizerParams } from '../interfaces';

@Directive({
    selector: '[os-resizable]'
})
export class ResizableDirective implements AfterViewInit, OnDestroy {
    @Input('os-resizable')
    public set config(config: IResizerParams) {
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

    public get config(): IResizerParams {
        return this._config;
    }

    @Output()
    public osResizableElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    @Output()
    public osResizersWrapperElementInit: EventEmitter<HTMLElement> = new EventEmitter();

    @Output()
    public osResizeStart: EventEmitter<IResizeInfo> = new EventEmitter();

    @Output()
    public osResizeEnd: EventEmitter<IResizeInfo> = new EventEmitter();

    @Output()
    public osResizing: EventEmitter<IResizeInfo> = new EventEmitter();

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

    public updateConfigWithoutChanges(config: IResizerParams): void {
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

        (this.config.isEnabled) ? classList.add(CssClass.Active) : classList.remove(CssClass.Active);
    }

    private resizerMouseDownHandler(event: MouseEvent, resizerId: ResizerEnum): void {
        if (!this.isResizeAllowed(event)) {
            return;
        }

        event.preventDefault();
        this._resizerInstance = ResizerFactory.create(resizerId, this);
        this._resizerInstance.init(this._resizableElement, event);
        this._resizableElement.classList.add(CssClass.Resizing);
        this.document.addEventListener('mousemove', this.documentMouseMoveHandler);
        this.document.addEventListener('mouseup', this.documentMouseUpHandler);
        this.osResizeStart.emit(this.getResizeInfo(event));
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        this._resizerInstance.resizeElement(event);
        this.osResizing.emit(this.getResizeInfo(event));
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        this._resizableElement.classList.remove(CssClass.Resizing);
        this.document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        this.osResizeEnd.emit(this.getResizeInfo(event));
    }

    private getResizeInfo(mouseEvent: MouseEvent): IResizeInfo {
        return {
            resizableElement: this._resizableElement,
            mouseEvent
        };
    }

    private isResizeAllowed(event: MouseEvent): boolean {
        return (
            this.config.isEnabled &&
            this.config.allowedMouseButtons?.includes(event.button)
        );
    }
}
