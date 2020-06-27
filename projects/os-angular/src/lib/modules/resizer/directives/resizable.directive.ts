import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ResizerEnum } from '../enums';
import { ResizerConfig } from '../interfaces';
import { Resizer, TopLeftResizer, TopRightResizer, BottomLeftResizer, BottomRightResizer } from '../classes';

@Directive({
    selector: '[os-resizable]'
})
export class OsResizableDirective implements OnInit, OnDestroy {

    @Input()
    public resizerConfig: ResizerConfig;

    public readonly resizers: HTMLDivElement[] = [];
    public minWidth;
    public minHeight;
    public originalWidth = 20;
    public originalHeight = 20;
    public originalX = 20;
    public originalY = 20;
    public originalMouseX = 20;
    public originalMouseY = 20;
    public activeResizerName: ResizerEnum;

    public get resizableElement (): HTMLElement {
        return this._resizableElement;
    }

    public get resizerElement (): HTMLElement {
        return this._resizerElement;
    }

    private _resizableElement: HTMLElement;
    private _resizerElement: HTMLElement;

    private readonly _defaultMinSize: number = 20;

    private readonly _resizerClasses: ResizerEnum[] = [
        ResizerEnum.topLeft, ResizerEnum.topRight,
        ResizerEnum.bottomLeft, ResizerEnum.bottomRight
    ];

    private readonly _resizerInstanceMap: Map<ResizerEnum, Resizer> = new Map();

    constructor (
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit (): void {
        this.minWidth = this.resizerConfig?.minWidth || this._defaultMinSize;
        this.minHeight = this.resizerConfig?.minHeight || this._defaultMinSize;

        this.initResizableElement();
        this.createResizerElement();
        this.initResizers();
        this.initResizerInstances();
    }

    public ngOnDestroy (): void {
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
    }

    private initResizableElement (): void {
        if (this.resizerConfig?.targetElementSelector) {
            this._resizableElement = this.element.nativeElement.querySelector(this.resizerConfig.targetElementSelector);
        } else {
            this._resizableElement = this.element.nativeElement;
        }
    }

    private createResizerElement (): void {
        this._resizerElement = document.createElement(`os-resizers`);

        this._resizerClasses.forEach((currResizerClass) => {
            const resizerElement = document.createElement('div');

            resizerElement.classList.add('os-resizer', currResizerClass);
            resizerElement.setAttribute('data-resizer-name', currResizerClass);

            this.resizers.push(resizerElement);

            this._resizerElement.appendChild(resizerElement);
        });

        this._resizableElement.appendChild(this._resizerElement);
    }

    private initResizers (): void {
        for (const resizer of this.resizers) {
            const resizeName = resizer.getAttribute('data-resizer-name') as ResizerEnum;

            resizer.addEventListener('mousedown', (event: MouseEvent) => {
                this.activeResizerName = resizeName;

                this.resizerMouseDownHandler(event);
            });
        }
    }

    private initResizerInstances (): void {
        this._resizerInstanceMap
            .set(ResizerEnum.topLeft, new TopLeftResizer(this))
            .set(ResizerEnum.topRight, new TopRightResizer(this))
            .set(ResizerEnum.bottomLeft, new BottomLeftResizer(this))
            .set(ResizerEnum.bottomRight, new BottomRightResizer(this));
    }

    private readonly resizerMouseDownHandler = (e: MouseEvent): void => {
        const { left: resizableElemBoundingLeft, top: resizableElemBoundingTop } = this._resizableElement.getBoundingClientRect();
        const { width: resizableElemWidth, height: resizableElemHeight } = getComputedStyle(this._resizableElement, null);

        e.preventDefault();

        this.originalWidth = parseFloat(resizableElemWidth.replace('px', ''));
        this.originalHeight = parseFloat(resizableElemHeight.replace('px', ''));
        this.originalX = resizableElemBoundingLeft;
        this.originalY = resizableElemBoundingTop;
        this.originalMouseX = e.pageX;
        this.originalMouseY = e.pageY;

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);
    }

    private readonly documentMouseMoveHandler = (e: MouseEvent): void => {
        const resizerInstance = this._resizerInstanceMap.get(this.activeResizerName);

        resizerInstance.resizeElement(e);
    }

    private readonly documentMouseUpHandler = (): void => {
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
    }

}
