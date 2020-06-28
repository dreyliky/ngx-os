import { Resizer } from './resizer';

export class BottomLeftResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;
        }

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;

            if (this.config.allowChangePosition) {
                this.context.resizableElement.style[this.config.xAxisStyleName] = `${this.context.originalX + (event.pageX - this.context.originalMouseX)}px`;
            }
        }

        this.onResize();
    }

}
