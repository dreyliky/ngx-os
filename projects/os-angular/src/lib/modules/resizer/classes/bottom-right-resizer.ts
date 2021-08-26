/* eslint-disable max-lines-per-function */
import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

export class BottomRightResizer extends BaseResizer {
    public static id = ResizerEnum.bottomRight;

    public resizeElement(event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);
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
                if (this.config.yAxisStyleName === 'bottom' || this.config.yAxisStyleName === 'marginBottom') {
                    const position = `${(docElement.clientHeight - event.clientY)}px`;

                    this.context.resizableElement.style[this.config.yAxisStyleName] = position;
                }
            }
        }

        this.onResize();
    }
}
