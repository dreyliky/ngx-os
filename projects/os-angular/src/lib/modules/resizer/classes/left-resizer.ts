import { Resizer } from './resizer';

export class LeftResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;

            if (this.config.allowChangePosition) {
                this.context.resizableElement.style.left = `${this.context.originalX + (event.pageX - this.context.originalMouseX)}px`;
            }
        }

        this.onResize();
    }

}
