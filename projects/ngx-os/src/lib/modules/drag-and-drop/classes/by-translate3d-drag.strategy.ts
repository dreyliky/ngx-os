import { BaseDragStrategy } from './base-drag.strategy';

/** @internal */
export class ByTranslate3dDragStrategy extends BaseDragStrategy {
    public updateElementPosition(event: MouseEvent): void {
        const x = `${event.clientX - this.initialDomRect.x - this.context.shiftX}px`;
        const y = `${event.clientY - this.initialDomRect.y - this.context.shiftY}px`;
        this.context.movableElement.style.transform = `translate3d(${x}, ${y}, 0px)`;
    }
}
