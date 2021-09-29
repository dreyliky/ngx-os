import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';

/** @internal */
export class BottomRightResizer extends BaseResizer {
    public static readonly id = ResizerEnum.bottomRight;

    private readonly documentElement = document.documentElement;

    public resizeElement(event: MouseEvent): void {
        this.processAxisX(event);
        this.processAxisY(event);
    }

    private processAxisX(event: MouseEvent): void {
        const width = this.context.originalWidth + (event.pageX - this.context.originalMouseX);

        if (width > this.config.minWidth && width < this.config.maxWidth) {
            this.context.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisRightStyleProperty) {
                const position = `${(this.documentElement.clientWidth - event.clientX)}px`;

                this.context.resizableElement.style.setProperty(this.config.xAxisRightStyleProperty, position);
            }
        }
    }

    private processAxisY(event: MouseEvent): void {
        const height = this.context.originalHeight + (event.pageY - this.context.originalMouseY);

        if (height > this.config.minHeight && height < this.config.maxHeight) {
            this.context.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisBottomStyleProperty) {
                const position = `${(this.documentElement.clientHeight - event.clientY)}px`;

                this.context.resizableElement.style.setProperty(this.config.yAxisBottomStyleProperty, position);
            }
        }
    }
}
