import { Resizer } from './resizer';

export class TopResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);

        if (height > this.context.minHeight) {
            this.context.resizableElement.style.height = `${height}px`;
            this.context.resizableElement.style.top = `${this.context.originalY + (event.pageY - this.context.originalMouseY)}px`;
        }
    }

}
