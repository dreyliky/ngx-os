import { ɵPointerHelper } from '../../../core';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵTopResizer extends ɵBaseResizer {
    public resizeElement(event: PointerEvent | TouchEvent): void {
        const pageY = ɵPointerHelper.getPageY(event);
        const height = this.originalHeight - (pageY - this.originalMouseY);

        if (height > this.minHeight && height < this.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisTopStyleProperty) {
                const position = `${this.originalY + (pageY - this.originalMouseY)}px`;
                const property = this.config.yAxisTopStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }
}
