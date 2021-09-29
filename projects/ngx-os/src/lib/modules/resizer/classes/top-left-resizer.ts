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
        const width = this.originalWidth - (event.pageX - this.originalMouseX);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisLeftStyleProperty) {
                const position = `${this.originalX + (event.pageX - this.originalMouseX)}px`;

                this.resizableElement.style.setProperty(this.config.xAxisLeftStyleProperty, position);
            }
        }
    }

    private processAxisY(event: MouseEvent): void {
        const height = this.originalHeight - (event.pageY - this.originalMouseY);

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisTopStyleProperty) {
                const position = `${this.originalY + (event.pageY - this.originalMouseY)}px`;

                this.resizableElement.style.setProperty(this.config.yAxisTopStyleProperty, position);
            }
        }
    }
}
