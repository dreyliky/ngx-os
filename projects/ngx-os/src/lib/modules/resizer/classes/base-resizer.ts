import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { ResizerConfig } from './resizer-config';

/** @internal */
export abstract class BaseResizer {
    public static readonly id: ResizerEnum;

    protected config: ResizerConfig;

    constructor(
        protected readonly context: ResizableDirective
    ) {
        this.config = this.context.resizerConfig;
    }

    public abstract resizeElement(event: MouseEvent): void;
}
