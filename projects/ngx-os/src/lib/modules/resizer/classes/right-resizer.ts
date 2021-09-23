import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class RightResizer extends BaseResizer {
    public static id = ResizerEnum.right;

    public resizeElement(event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;
        }

        this.onResize();
    }
}
