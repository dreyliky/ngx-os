import { ResizerEnum } from '../enums';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵLeftResizer extends ɵBaseResizer {
    public static id = ResizerEnum.Left;

    public resizeElement(event: MouseEvent): void {
        const width = this.originalWidth - (event.pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisLeftStyleProperty) {
                const position = `${this.originalX + (event.pageX - this.originalMouseX)}px`;
                const property = this.config.xAxisLeftStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }
}
