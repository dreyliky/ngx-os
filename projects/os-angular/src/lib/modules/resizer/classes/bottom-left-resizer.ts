import { Resizer } from './resizer';

export class BottomLeftResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);

        if (height > this.context.minHeight) {
            this.context.resizableElement.style.height = height + 'px';
        }

        if (width > this.context.minWidth) {
            this.context.resizableElement.style.width = width + 'px';
            this.context.resizableElement.style.left = this.context.originalX + (event.pageX - this.context.originalMouseX) + 'px';
        }
    }

}
