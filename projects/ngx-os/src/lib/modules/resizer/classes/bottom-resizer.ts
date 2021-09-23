import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class BottomResizer extends BaseResizer {
    public static id = ResizerEnum.bottom;

    public resizeElement(event: MouseEvent): void {
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);
        const docElement = document.documentElement;

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;

            if (this.config.isAllowChangePosition) {
                if (this.config.yAxisStyleName === 'bottom' || this.config.yAxisStyleName === 'marginBottom') {
                    const position = `${docElement.clientHeight - event.pageY}px`;

                    this.context.resizableElement.style[this.config.yAxisStyleName] = position;
                }
            }
        }

        this.onResize();
    }
}
