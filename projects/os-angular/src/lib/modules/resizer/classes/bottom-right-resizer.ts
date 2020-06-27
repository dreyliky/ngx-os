import { Resizer } from './resizer';

export class BottomRightResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);

        if (width > this.context.minWidth) {
            this.context.resizableElement.style.width = width + 'px';
        }

        if (height > this.context.minHeight) {
            this.context.resizableElement.style.height = height + 'px';
        }
    }

}
