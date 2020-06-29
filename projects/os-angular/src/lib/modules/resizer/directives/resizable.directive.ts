import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ResizerEnum } from '../enums';
import { ResizerConfig } from '../classes';

import {
    Resizer,
    TopResizer,
    LeftResizer,
    RightResizer,
    BottomResizer,
    TopLeftResizer,
    TopRightResizer,
    BottomLeftResizer,
    BottomRightResizer
} from '../classes';
import { ResizeInfo } from '../interfaces';
import { MouseButtonEnum } from '../../../core';

@Directive({
    selector: '[os-resizable]'
})
export class OsResizableDirective implements OnInit, OnDestroy {

    @Input()
    public set resizerConfig (config: ResizerConfig) {
        this._resizerConfig = { ...this._resizerConfig, ...config };

        this.updateResizersActivity();
    }

    public get resizerConfig (): ResizerConfig {
        return this._resizerConfig;
    }

    @Output()
    public OnResizableElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public OnResizerElementInit = new EventEmitter<HTMLElement>();

    @Output()
    public OnResizeStart = new EventEmitter<ResizeInfo>();

    @Output()
    public OnResizeEnd = new EventEmitter<ResizeInfo>();

    @Output()
    public OnResizing = new EventEmitter<ResizeInfo>();

    public get resizableElement (): HTMLElement {
        return this._resizableElement;
    }

    public get resizerElement (): HTMLElement {
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

    constructor (
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit (): void {
        this.initAllowedResizers();
        this.initResizableElement();
        this.initResizersWrapperElement();
        this.initResizerElements();
        this.initResizerInstances();
        this.updateResizersActivity();
    }

    public ngOnDestroy (): void {
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
    }

    public getResizeInfo (): ResizeInfo {
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

    private initAllowedResizers (): void {
        if (this.resizerConfig.allowedResizers) {
            this._allowedResizers = this.resizerConfig.allowedResizers;
        } else {
            this._allowedResizers = Object.keys(ResizerEnum)
                .filter((key) => typeof(key) === 'string') as ResizerEnum[];
        }
    }

    private initResizableElement (): void {
        if (this.resizerConfig?.targetElementSelector) {
            this._resizableElement = this.element.nativeElement.querySelector(this.resizerConfig.targetElementSelector);
        } else {
            this._resizableElement = this.element.nativeElement;
        }

        this.OnResizableElementInit.emit(this._resizableElement);
    }

    private initResizersWrapperElement (): void {
        this._resizersWrapperElement = document.createElement(`os-resizers`);

        this._resizableElement.appendChild(this._resizersWrapperElement);

        this.OnResizerElementInit.emit(this._resizersWrapperElement);
    }

    private initResizerElements (): void {
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

    private initResizerInstances (): void {
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

    private updateResizersActivity (): void {
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

        const { left: resizableElemBoundingLeft, top: resizableElemBoundingTop } = this._resizableElement.getBoundingClientRect();
        const { width: resizableElemWidth, height: resizableElemHeight } = getComputedStyle(this._resizableElement, null);

        event.preventDefault();

        this.originalWidth = parseFloat(resizableElemWidth.replace('px', ''));
        this.originalHeight = parseFloat(resizableElemHeight.replace('px', ''));
        this.originalX = resizableElemBoundingLeft;
        this.originalY = resizableElemBoundingTop;
        this.originalMouseX = event.pageX;
        this.originalMouseY = event.pageY;

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);

        this.OnResizeStart.emit(this.getResizeInfo());
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        const resizerInstance = this._resizerInstanceMap.get(this.activeResizerName);

        resizerInstance.resizeElement(event);
    }

    private readonly documentMouseUpHandler = (): void => {
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);

        this.OnResizeEnd.emit(this.getResizeInfo());
    }

}
