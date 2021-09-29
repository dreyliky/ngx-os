import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class BottomResizer extends BaseResizer {
    public static id = ResizerEnum.bottom;

    public resizeElement(event: MouseEvent): void {
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);
        const docElement = document.documentElement;

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition) {
                if (this.config.yAxisBottomStyleProperty) {
                    const position = `${docElement.clientHeight - event.pageY}px`;

                    this.context.resizableElement.style.setProperty(this.config.yAxisBottomStyleProperty, position);
                }
            }
        }
    }
}
