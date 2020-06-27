import { Resizer } from './resizer';

export class BottomResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);

        if (height > this.context.minHeight && height < this.context.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;
        }
    }

}
