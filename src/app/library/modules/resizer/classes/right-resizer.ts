import { ɵPointerHelper } from '../../../core';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵRightResizer extends ɵBaseResizer {
    public resizeElement(event: PointerEvent | TouchEvent): void {
        const pageX = ɵPointerHelper.getPageX(event);
        const width = this.originalWidth + (pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);
        }
    }
}
