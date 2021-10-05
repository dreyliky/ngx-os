import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class RightResizer extends BaseResizer {
    public static id = ResizerEnum.right;

    public resizeElement(event: MouseEvent): void {
        const width = this.originalWidth + (event.pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);
        }
    }
}