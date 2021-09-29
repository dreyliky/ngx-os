import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class TopResizer extends BaseResizer {
    public static readonly id = ResizerEnum.top;

    public resizeElement(event: MouseEvent): void {
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
