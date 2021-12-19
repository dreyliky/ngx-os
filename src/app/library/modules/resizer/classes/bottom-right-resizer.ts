import { ResizerEnum } from '../enums';
import { ɵBaseResizer } from './base-resizer';

/** @internal */
export class ɵBottomRightResizer extends ɵBaseResizer {
    public static id = ResizerEnum.BottomRight;

    public resizeElement(event: MouseEvent): void {
        this.processAxisX(event);
        this.processAxisY(event);
    }

    private processAxisX(event: MouseEvent): void {
        const width = this.originalWidth + (event.pageX - this.originalMouseX);

        if (width > this.minWidth && width < this.maxWidth) {
            this.resizableElement.style.setProperty(this.config.widthStyleProperty, `${width}px`);

            if (this.config.isAllowChangePosition && this.config.xAxisRightStyleProperty) {
                const position = `${(this.documentElement.clientWidth - event.clientX)}px`;
                const property = this.config.xAxisRightStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }

    private processAxisY(event: MouseEvent): void {
        const height = this.originalHeight + (event.pageY - this.originalMouseY);

        if (height > this.minHeight && height < this.maxHeight) {
            this.resizableElement.style.setProperty(this.config.heightStyleProperty, `${height}px`);

            if (this.config.isAllowChangePosition && this.config.yAxisBottomStyleProperty) {
                const position = `${(this.documentElement.clientHeight - event.clientY)}px`;
                const property = this.config.yAxisBottomStyleProperty;

                this.resizableElement.style.setProperty(property, position);
            }
        }
    }
}
