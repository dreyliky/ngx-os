import { OsResizableDirective } from '../directives';
import { ResizerConfig } from './resizer-config';

export abstract class Resizer {

    protected config: ResizerConfig;

    constructor(
        protected readonly context: OsResizableDirective
    ) {
        this.config = this.context.resizerConfig;
    }

    public abstract resizeElement (event: MouseEvent): void;

    protected onResize(): void {
        const resizeInfo = this.context.getResizeInfo();

        this.context.osResizing.emit(resizeInfo);
    }

}
