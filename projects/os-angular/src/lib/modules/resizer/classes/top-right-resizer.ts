import { Resizer } from './resizer';

export class TopRightResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;
        }

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;

            if (this.config.allowChangePosition) {
                this.context.resizableElement.style.top = `${this.context.originalY + (event.pageY - this.context.originalMouseY)}px`;
            }
        }

        this.onResize();
    }

}
