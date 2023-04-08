import { ɵPointerHelper } from '../../../../core';
import { ɵDragStrategyEnum } from '../../enums';
import { DragInfo } from '../../interfaces';
import { ɵBaseDragStrategyImpl } from './base-drag-impl.strategy';
import { DragStrategyByTranslate3d } from './by-translate3d-drag.strategy';

/** @internal */
export class ɵDragStrategyByTranslate3dImpl extends ɵBaseDragStrategyImpl {
    public override readonly type = ɵDragStrategyEnum.ByTranslate3d;

    protected override config: DragStrategyByTranslate3d;

    private initialX: number;
    private initialY: number;

    public override registerMouseDown(dragInfo: DragInfo): void {
        this.initInitialCoordinates();
        super.registerMouseDown(dragInfo);
    }

    public updateElementPosition(event: PointerEvent | TouchEvent): void {
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

    private calculateElementPositionX(event: PointerEvent | TouchEvent): string {
        const position = (!this.config.isLockAxisX) ?
            (ɵPointerHelper.getClientX(event) - this.initialX - this.shiftX) : 0;

        return `${position}px`;
    }

    private calculateElementPositionY(event: PointerEvent | TouchEvent): string {
        const position = (!this.config.isLockAxisY) ?
            (ɵPointerHelper.getClientY(event) - this.initialY - this.shiftY) : 0;

        return `${position}px`;
    }
}
