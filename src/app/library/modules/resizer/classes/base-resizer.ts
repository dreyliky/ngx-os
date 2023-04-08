import { DOCUMENT } from '@angular/common';
import { Injector } from '@angular/core';
import { ɵParseInt, ɵPointerHelper } from '../../../core';
import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { ɵResizerConfigModel } from './resizer-config';

/** @internal */
export abstract class ɵBaseResizer {
    public static id: ResizerEnum = null;

    protected readonly documentElement: HTMLElement;
    protected minWidth: number;
    protected maxWidth: number;
    protected minHeight: number;
    protected maxHeight: number;
    protected originalWidth = 20;
    protected originalHeight = 20;
    protected originalX = 20;
    protected originalY = 20;
    protected originalMouseX = 20;
    protected originalMouseY = 20;
    protected config: ɵResizerConfigModel;
    protected resizableElement: HTMLElement;

    private minSize = 20;

    constructor(
        protected readonly context: ResizableDirective,
        private readonly injector: Injector
    ) {
        this.config = this.context.config;
        this.documentElement = this.injector.get(DOCUMENT)?.documentElement;
    }

    public init(resizableElement: HTMLElement, event: PointerEvent | TouchEvent): void {
        const { width, height, left, top } = resizableElement.getBoundingClientRect();
        this.originalWidth = width;
        this.originalHeight = height;
        this.originalX = left;
        this.originalY = top;
        this.originalMouseX = ɵPointerHelper.getPageX(event);
        this.originalMouseY = ɵPointerHelper.getPageY(event);
        this.resizableElement = resizableElement;

        this.initMinAndMaxSizes();
    }

    private initMinAndMaxSizes(): void {
        const computedStyles = getComputedStyle(this.resizableElement);
        const { minWidth, maxWidth, minHeight, maxHeight } = computedStyles;

        this.minWidth = this.config.minWidth || ɵParseInt(minWidth) || this.minSize;
        this.maxWidth = this.config.maxWidth || ɵParseInt(maxWidth) || this.minSize;
        this.minHeight = this.config.minHeight || ɵParseInt(minHeight) || this.minSize;
        this.maxHeight = this.config.maxHeight || ɵParseInt(maxHeight) || this.minSize;
    }

    public abstract resizeElement(event: PointerEvent | TouchEvent): void;
}
