import { Resizer } from './resizer';

export class LeftResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);

        if (width > this.context.minWidth && width < this.context.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;

            if (this.context.isAllowChangePosition) {
                this.context.resizableElement.style.left = `${this.context.originalX + (event.pageX - this.context.originalMouseX)}px`;
            }
        }
    }

}
