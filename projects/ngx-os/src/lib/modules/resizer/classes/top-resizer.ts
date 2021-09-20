import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

export class TopResizer extends BaseResizer {
    public static id = ResizerEnum.top;

    public resizeElement(event: MouseEvent): void {
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);

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
