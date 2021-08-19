import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
    BottomLeftResizer,
    BottomResizer,
    BottomRightResizer,
    LeftResizer,
    Resizer,
    ResizerConfig,
    RightResizer,
    TopLeftResizer,
    TopResizer,
    TopRightResizer
} from '../classes';
import { ResizerEnum } from '../enums';
import { ResizeInfo } from '../interfaces';

@Directive({
    selector: '[os-resizable]'
})
export class OsResizableDirective implements OnInit, OnDestroy {
    @Input('os-resizable')
    public set resizerConfig(config: ResizerConfig) {
        this._resizerConfig = { ...this._resizerConfig, ...config };

        this.initResizableElement();
        this.updateResizersWrapperDomPlacement();
        this.updateResizersActivity();
    }

    public get resizerConfig(): ResizerConfig {
        return this._resizerConfig;
    }

    @Output()
    public osResizableElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public osResizerElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public osResizeStart = new EventEmitter<ResizeInfo>();

    @Output()
    public osResizeEnd = new EventEmitter<ResizeInfo>();

    @Output()
    public osResizing = new EventEmitter<ResizeInfo>();

    public get resizableElement(): HTMLElement {
        return this._resizableElement;
    }

    public get resizerElement(): HTMLElement {
        return this._resizersWrapperElement;
    }

    public originalWidth = 20;
    public originalHeight = 20;
    public originalX = 20;
    public originalY = 20;
    public originalMouseX = 20;
    public originalMouseY = 20;
    public activeResizerName: ResizerEnum;

    private _resizableElement: HTMLElement;
    private _resizersWrapperElement: HTMLElement;
    private readonly _resizerElements: HTMLElement[] = [];

    private _allowedResizers: ResizerEnum[];
    private _resizerConfig: ResizerConfig = new ResizerConfig();

    private readonly _resizerInstanceMap: Map<ResizerEnum, Resizer> = new Map();

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.initAllowedResizers();
        this.initResizersWrapperElement();
        this.initResizerElements();
        this.initResizerInstances();
        this.updateResizersWrapperDomPlacement();
        this.updateResizersActivity();
    }

    public ngOnDestroy(): void {
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
    }

    public getResizeInfo(): ResizeInfo {
        const domRect = this._resizableElement.getBoundingClientRect();

        return {
            width: domRect.width,
            height: domRect.height,
            positionTop: domRect.top,
            positionLeft: domRect.left,
            positionRight: domRect.right,
            positionBottom: domRect.bottom
        };
    }

    private initAllowedResizers(): void {
        if (this.resizerConfig.allowedResizers) {
            this._allowedResizers = this.resizerConfig.allowedResizers;
        } else {
            this._allowedResizers = Object.keys(ResizerEnum)
                .filter((key) => typeof(key) === 'string') as ResizerEnum[];
        }
    }

    private initResizableElement(): void {
        if (this.resizerConfig?.targetElement) {
            this._resizableElement = this.resizerConfig.targetElement;
        } else {
            this._resizableElement = this.element.nativeElement;
        }

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
                    this.activeResizerName = resizerName;

                    this.resizerMouseDownHandler(event);
                }
            });

            this._resizerElements.push(resizerElement);
            this._resizersWrapperElement.appendChild(resizerElement);
        });
    }

    private initResizerInstances(): void {
        this._resizerInstanceMap
            .set(ResizerEnum.top, new TopResizer(this))
            .set(ResizerEnum.left, new LeftResizer(this))
            .set(ResizerEnum.right, new RightResizer(this))
            .set(ResizerEnum.bottom, new BottomResizer(this))
            .set(ResizerEnum.topLeft, new TopLeftResizer(this))
            .set(ResizerEnum.topRight, new TopRightResizer(this))
            .set(ResizerEnum.bottomLeft, new BottomLeftResizer(this))
            .set(ResizerEnum.bottomRight, new BottomRightResizer(this));
    }

    private updateResizersWrapperDomPlacement(): void {
        if (this._resizersWrapperElement && (this._resizersWrapperElement.parentElement !== this._resizableElement)) {
            this._resizersWrapperElement.remove();

            this._resizableElement.appendChild(this._resizersWrapperElement);
        }
    }

    private updateResizersActivity(): void {
        const activityClassName: string = 'active';

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

    // eslint-disable-next-line max-lines-per-function
    private readonly resizerMouseDownHandler = (event: MouseEvent): void => {
        if (
            !this.resizerConfig.isEnabled
            ||
            !this.resizerConfig.allowedMouseButtons
            ||
            !this.resizerConfig.allowedMouseButtons.includes(event.button)
        ) {
            return;
        }

        const resizableElemDomRect = this._resizableElement.getBoundingClientRect();

        event.preventDefault();

        this.originalWidth = resizableElemDomRect.width;
        this.originalHeight = resizableElemDomRect.height;
        this.originalX = resizableElemDomRect.left;
        this.originalY = resizableElemDomRect.top;
        this.originalMouseX = event.pageX;
        this.originalMouseY = event.pageY;

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);

        this.osResizeStart.emit(this.getResizeInfo());
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        const resizerInstance = this._resizerInstanceMap.get(this.activeResizerName);

        resizerInstance.resizeElement(event);
    }

    private readonly documentMouseUpHandler = (): void => {
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);

        this.osResizeEnd.emit(this.getResizeInfo());
    }
}
