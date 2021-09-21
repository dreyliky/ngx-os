import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { ResizerConfig } from './resizer-config';

export abstract class BaseResizer {
    public static readonly id: ResizerEnum;

    protected config: ResizerConfig;

    constructor(
        protected readonly context: ResizableDirective
    ) {
        this.config = this.context.resizerConfig;
    }

    protected onResize(): void {
        const resizeInfo = this.context.getResizeInfo();

        this.context.osResizing.emit(resizeInfo);
    }

    public abstract resizeElement(event: MouseEvent): void;
}
