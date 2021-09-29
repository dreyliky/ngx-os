import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class BottomResizer extends BaseResizer {
    public static readonly id = ResizerEnum.bottom;

    public resizeElement(event: MouseEvent): void {
        const height = this.originalHeight + (event.pageY - this.originalMouseY);
        const { documentElement } = document;

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisBottomStyleProperty) {
                const position = `${documentElement.clientHeight - event.pageY}px`;

                this.resizableElement.style.setProperty(this.config.yAxisBottomStyleProperty, position);
            }
        }
    }
}
