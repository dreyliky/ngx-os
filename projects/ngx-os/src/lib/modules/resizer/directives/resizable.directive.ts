import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseResizer, ResizerConfig, ResizerFactory } from '../classes';
import { ResizerCssClassEnum as CssClass, ResizerEnum } from '../enums';
import { IResizeInfo, IResizerParams } from '../interfaces';

@Directive({
    selector: '[os-resizable]'
})
export class ResizableDirective implements OnInit, OnDestroy {
    @Input('os-resizable')
    public set resizerConfig(config: IResizerParams) {
        this._resizerConfig = { ...this._resizerConfig, ...config };

        this.initResizableElement();
        this.updateResizersWrapperDomPlacement();
        this.updateResizersActivity();
    }

    public get resizerConfig(): IResizerParams {
        return this._resizerConfig;
    }

    @Output()
    public osResizableElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public osResizerElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public osResizeStart = new EventEmitter<IResizeInfo>();

    @Output()
    public osResizeEnd = new EventEmitter<IResizeInfo>();

    @Output()
    public osResizing = new EventEmitter<IResizeInfo>();

    public get resizableElement(): HTMLElement {
        return this._resizableElement;
    }

    public originalWidth = 20;
    public originalHeight = 20;
    public originalX = 20;
    public originalY = 20;
    public originalMouseX = 20;
    public originalMouseY = 20;
    public activeResizerId: ResizerEnum;

    private _resizableElement: HTMLElement;
    private _resizersWrapperElement: HTMLElement;
    private readonly _resizerElements: HTMLElement[] = [];

    private _resizerInstance: BaseResizer;
    private _allowedResizers: ResizerEnum[];
    private _resizerConfig = new ResizerConfig();

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.initAllowedResizers();
        this.initResizersWrapperElement();
        this.initResizerElements();
        this.updateResizersWrapperDomPlacement();
        this.updateResizersActivity();
    }

    public ngOnDestroy(): void {
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
    }

    private initAllowedResizers(): void {
        this._allowedResizers = this.resizerConfig.allowedResizers;
    }

    private initResizableElement(): void {
        this._resizableElement = this.resizerConfig?.targetElement ?? this.hostRef.nativeElement;

        this.osResizableElementInit.emit(this._resizableElement);
    }

    private initResizersWrapperElement(): void {
        this._resizersWrapperElement = document.createElement(`os-resizers`);

        this.osResizerElementInit.emit(this._resizersWrapperElement);
    }

    private initResizerElements(): void {
        this._allowedResizers.forEach((resizerName) => {
            const resizerElement = document.createElement('div');

            resizerElement.classList.add('os-resizer', resizerName);

            resizerElement.addEventListener('mousedown', (event: MouseEvent) => {
                if (this.resizerConfig.isEnabled) {
                    this.activeResizerId = resizerName;

                    this.resizerMouseDownHandler(event);
                }
            });

            this._resizerElements.push(resizerElement);
            this._resizersWrapperElement.appendChild(resizerElement);
        });
    }

    private updateResizersWrapperDomPlacement(): void {
        if (this._resizersWrapperElement && (this._resizersWrapperElement.parentElement !== this._resizableElement)) {
            this._resizersWrapperElement.remove();

            this._resizableElement.appendChild(this._resizersWrapperElement);
        }
    }

    private updateResizersActivity(): void {
        const activityClassName: string = 'os-active';

        this._resizerElements.forEach((resizerElement) => {
            if (resizerElement.classList.contains(activityClassName)) {
                if (!this._resizerConfig.isEnabled) {
                    resizerElement.classList.remove(activityClassName);
                }
            } else {
                if (this._resizerConfig.isEnabled) {
                    resizerElement.classList.add(activityClassName);
                }
            }
        });
    }

    private readonly resizerMouseDownHandler = (event: MouseEvent): void => {
        if (!this.isResizeAllowed(event)) {
            return;
        }

        const { width, height, left, top } = this._resizableElement.getBoundingClientRect();
        this.originalWidth = width;
        this.originalHeight = height;
        this.originalX = left;
        this.originalY = top;
        this.originalMouseX = event.pageX;
        this.originalMouseY = event.pageY;

        event.preventDefault();
        this._resizerInstance = ResizerFactory.create(this.activeResizerId, this);
        this._resizableElement.classList.add(CssClass.Resizing);
        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);
        this.osResizeStart.emit(this.getResizeInfo(event));
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        this._resizerInstance.resizeElement(event);
        this.osResizing.emit(this.getResizeInfo(event));
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        this._resizableElement.classList.remove(CssClass.Resizing);
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
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
            this.resizerConfig.isEnabled &&
            this.resizerConfig.allowedMouseButtons?.includes(event.button)
        );
    }
}
