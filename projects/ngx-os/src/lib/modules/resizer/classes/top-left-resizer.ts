import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class TopLeftResizer extends BaseResizer {
    public static readonly id = ResizerEnum.topLeft;

    public resizeElement(event: MouseEvent): void {
        this.processAxisX(event);
        this.processAxisY(event);
    }

    private processAxisX(event: MouseEvent): void {
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisLeftStyleProperty) {
                const position = `${this.context.originalX + (event.pageX - this.context.originalMouseX)}px`;

                this.context.resizableElement.style.setProperty(this.config.xAxisLeftStyleProperty, position);
            }
        }
    }

    private processAxisY(event: MouseEvent): void {
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisTopStyleProperty) {
                const position = `${this.context.originalY + (event.pageY - this.context.originalMouseY)}px`;

                this.context.resizableElement.style.setProperty(this.config.yAxisTopStyleProperty, position);
            }
        }
    }
}
