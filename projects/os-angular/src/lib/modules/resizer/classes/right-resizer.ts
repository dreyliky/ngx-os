import { Resizer } from './resizer';

export class RightResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);

        if (width > this.context.minWidth && width < this.context.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;
        }
    }

}