import { ResizerEnum } from '../enums';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵRightResizer extends ɵBaseResizer {
    public static id = ResizerEnum.Right;

    public resizeElement(event: PointerEvent): void {
        const width = this.originalWidth + (event.pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);
        }
    }
}
