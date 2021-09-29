import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class TopResizer extends BaseResizer {
    public static readonly id = ResizerEnum.top;

    public resizeElement(event: MouseEvent): void {
        const height = this.originalHeight - (event.pageY - this.originalMouseY);

        if (height > this.minHeight && height < this.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisTopStyleProperty) {
                const position = `${this.originalY + (event.pageY - this.originalMouseY)}px`;

                this.resizableElement.style.setProperty(this.config.yAxisTopStyleProperty, position);
            }
        }
    }
}
