import { ResizerEnum } from '../enums';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵBottomResizer extends ɵBaseResizer {
    public static id = ResizerEnum.Bottom;

    public resizeElement(event: MouseEvent): void {
        const height = this.originalHeight + (event.pageY - this.originalMouseY);

        if (height > this.minHeight && height < this.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisBottomStyleProperty) {
                const position = `${this.documentElement.clientHeight - event.pageY}px`;
                const property = this.config.yAxisBottomStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }
}
