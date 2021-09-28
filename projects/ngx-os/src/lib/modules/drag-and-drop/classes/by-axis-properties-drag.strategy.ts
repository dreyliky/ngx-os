import { BaseDragStrategy } from './base-drag.strategy';

/** @internal */
export class ByAxisPropertyDragStrategy extends BaseDragStrategy {
    public updateElementPosition(event: MouseEvent): void {
        this.context.movableElement.style.setProperty(
            this.context.config.xAxisStyleProperty,
            `${event.clientX - this.context.shiftX}px`
        );

        this.context.movableElement.style.setProperty(
            this.context.config.yAxisStyleProperty,
            `${event.clientY - this.context.shiftY}px`
        );
    }
}
