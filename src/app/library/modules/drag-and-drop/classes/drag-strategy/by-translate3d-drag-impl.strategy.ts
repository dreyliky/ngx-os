import { DragStrategyEnum } from '../../enums';
import { DragInfo } from '../../interfaces';
import { BaseDragStrategyImpl } from './base-drag-impl.strategy';
import { DragStrategyByTranslate3d } from './by-translate3d-drag.strategy';

/** @internal */
export class DragStrategyByTranslate3dImpl extends BaseDragStrategyImpl {
    public readonly type = DragStrategyEnum.ByTranslate3d;

    protected config: DragStrategyByTranslate3d;

    private initialX: number;
    private initialY: number;

    public registerMouseDown(dragInfo: DragInfo): void {
        this.initInitialCoordinates();
        super.registerMouseDown(dragInfo);
    }

    public updateElementPosition(event: MouseEvent): void {
        if (this.context.config.isAllowMoveElement) {
            const x = this.calculateElementPositionX(event);
            const y = this.calculateElementPositionY(event);
            this.context.movableElement.style.transform = `translate3d(${x}, ${y}, 0px)`;
        }
    }

    private initInitialCoordinates(): void {
        const computedStyle = window.getComputedStyle(this.context.movableElement);
        const transform = new WebKitCSSMatrix(computedStyle.transform);
        const domRect = this.context.movableElement.getBoundingClientRect();
        this.initialX = (domRect.left - transform.m41);
        this.initialY = (domRect.top - transform.m42);
    }

    private calculateElementPositionX(event: MouseEvent): string {
        const position = (!this.config.isLockAxisX) ?
            (event.clientX - this.initialX - this.shiftX) : 0;

        return `${position}px`;
    }

    private calculateElementPositionY(event: MouseEvent): string {
        const position = (!this.config.isLockAxisY) ?
            (event.clientY - this.initialY - this.shiftY) : 0;

        return `${position}px`;
    }
}
