import { Resizer } from './resizer';

export class TopResizer extends Resizer {

    public resizeElement (event: MouseEvent): void {
        const height = this.context.originalHeight - (event.pageY - this.context.originalMouseY);

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.height = `${height}px`;

            if (this.config.allowChangePosition) {
                this.context.resizableElement.style.top = `${this.context.originalY + (event.pageY - this.context.originalMouseY)}px`;
            }
        }

        this.onResize();
    }

}
