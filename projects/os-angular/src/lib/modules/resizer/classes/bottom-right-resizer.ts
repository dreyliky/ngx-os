import { Resizer } from './resizer';

export class BottomRightResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);

        if (width > this.context.minWidth && width < this.context.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;
        }

        if (height > this.context.minHeight && height < this.context.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;
        }
    }

}
