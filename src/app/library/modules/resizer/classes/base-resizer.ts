import { osParseInt } from '../../../core';
import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { ResizerConfigModel } from './resizer-config';

/** @internal */
export abstract class BaseResizer {
    public static id: ResizerEnum = null;

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
    protected config: ResizerConfigModel;
    protected resizableElement: HTMLElement;

    private minSize = 20;

    constructor(
        protected readonly context: ResizableDirective
    ) {
        this.config = this.context.config;
    }

    public init(resizableElement: HTMLElement, event: MouseEvent): void {
        const { width, height, left, top } = resizableElement.getBoundingClientRect();
        this.originalWidth = width;
        this.originalHeight = height;
        this.originalX = left;
        this.originalY = top;
        this.originalMouseX = event.pageX;
        this.originalMouseY = event.pageY;
        this.resizableElement = resizableElement;

        this.initMinAndMaxSizes();
    }

    private initMinAndMaxSizes(): void {
        const computedStyles = getComputedStyle(this.resizableElement);
        const { minWidth, maxWidth, minHeight, maxHeight } = computedStyles;

        this.minWidth = this.config.minWidth || osParseInt(minWidth) || this.minSize;
        this.maxWidth = this.config.maxWidth || osParseInt(maxWidth) || this.minSize;
        this.minHeight = this.config.minHeight || osParseInt(minHeight) || this.minSize;
        this.maxHeight = this.config.maxHeight || osParseInt(maxHeight) || this.minSize;
    }

    public abstract resizeElement(event: MouseEvent): void;
}
