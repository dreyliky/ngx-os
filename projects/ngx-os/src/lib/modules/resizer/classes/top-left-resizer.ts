/* eslint-disable max-lines-per-function */
import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

export class TopLeftResizer extends BaseResizer {
    public static id = ResizerEnum.topLeft;

    public resizeElement(event: MouseEvent): void {
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;

            if (this.config.isAllowChangePosition) {
                if (this.config.xAxisStyleName === 'left' || this.config.xAxisStyleName === 'marginLeft') {
                    const position = `${this.context.originalX + (event.pageX - this.context.originalMouseX)}px`;

                    this.context.resizableElement.style[this.config.xAxisStyleName] = position;
                }
            }
        }

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;

            if (this.config.isAllowChangePosition) {
                if (this.config.yAxisStyleName === 'top' || this.config.yAxisStyleName === 'marginTop') {
                    const position = `${this.context.originalY + (event.pageY - this.context.originalMouseY)}px`;

                    this.context.resizableElement.style[this.config.yAxisStyleName] = position;
                }
            }
        }

        this.onResize();
    }
}