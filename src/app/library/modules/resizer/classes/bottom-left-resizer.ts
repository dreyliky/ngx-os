import { ɵPointerHelper } from '../../../core';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵBottomLeftResizer extends ɵBaseResizer {
    public resizeElement(event: PointerEvent): void {
        this.processAxisX(event);
        this.processAxisY(event);
    }

    private processAxisX(event: PointerEvent | TouchEvent): void {
        const pageX = ɵPointerHelper.getPageX(event);
        const width = this.originalWidth - (pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisLeftStyleProperty) {
                const position = `${this.originalX + (pageX - this.originalMouseX)}px`;
                const property = this.config.xAxisLeftStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }

    private processAxisY(event: PointerEvent | TouchEvent): void {
        const pageY = ɵPointerHelper.getPageY(event);
        const height = this.originalHeight + (pageY - this.originalMouseY);

        if (height > this.minHeight && height < this.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisBottomStyleProperty) {
                const position = `${this.documentElement.clientHeight - pageY}px`;
                const property = this.config.yAxisBottomStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }
}
