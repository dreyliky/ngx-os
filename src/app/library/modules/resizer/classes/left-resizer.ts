import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class LeftResizer extends BaseResizer {
    public static id = ResizerEnum.Left;

    public resizeElement(event: MouseEvent): void {
        const width = this.originalWidth - (event.pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisLeftStyleProperty) {
                const position = `${this.originalX + (event.pageX - this.originalMouseX)}px`;

                this.resizableElement.style.setProperty(this.config.xAxisLeftStyleProperty, position);
            }
        }
    }
}
