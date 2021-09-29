/* eslint-disable max-lines-per-function */
import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class TopRightResizer extends BaseResizer {
    public static id = ResizerEnum.topRight;

    public resizeElement(event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);
        const docElement = document.documentElement;

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition) {
                if (this.config.xAxisRightStyleProperty) {
                    const position = `${(docElement.clientWidth - event.clientX)}px`;

                    this.context.resizableElement.style.setProperty(this.config.xAxisRightStyleProperty, position);
                }
            }
        }

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition) {
                if (this.config.yAxisTopStyleProperty) {
                    const position = `${this.context.originalY + (event.pageY - this.context.originalMouseY)}px`;

                    this.context.resizableElement.style.setProperty(this.config.yAxisTopStyleProperty, position);
                }
            }
        }
    }
}
