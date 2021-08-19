import { Resizer } from './resizer';

export class LeftResizer extends Resizer {
    public resizeElement(event: MouseEvent): void {
        const width = this.context.originalWidth - (event.pageX - this.context.originalMouseX);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.width = `${width}px`;

            if (this.config.isAllowChangePosition) {
                if (this.config.xAxisStyleName === 'left' || this.config.xAxisStyleName === 'marginLeft') {
                    const position = `${this.context.originalX + (event.pageX - this.context.originalMouseX)}px`;

                    this.context.resizableElement.style[this.config.xAxisStyleName] = position;
                }
            }
        }

        this.onResize();
    }
}
