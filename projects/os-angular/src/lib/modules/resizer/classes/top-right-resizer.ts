/* eslint-disable max-lines-per-function */
import { Resizer } from './resizer';

export class TopRightResizer extends Resizer {
    public resizeElement(event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);
        const docElement = document.documentElement;

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;

            if (this.config.isAllowChangePosition) {
                if (this.config.xAxisStyleName === 'right' || this.config.xAxisStyleName === 'marginRight') {
                    const position = `${(docElement.clientWidth - event.clientX)}px`;

                    this.context.resizableElement.style[this.config.xAxisStyleName] = position;
                }
            }
        }

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
