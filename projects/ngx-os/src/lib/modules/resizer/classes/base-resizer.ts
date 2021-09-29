import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { ResizerConfig } from './resizer-config';

/** @internal */
export abstract class BaseResizer {
    public static readonly id: ResizerEnum;

    protected originalWidth = 20;
    protected originalHeight = 20;
    protected originalX = 20;
    protected originalY = 20;
    protected originalMouseX = 20;
    protected originalMouseY = 20;
    protected config: ResizerConfig;
    protected resizableElement: HTMLElement;

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
    }

    public abstract resizeElement(event: MouseEvent): void;
}
