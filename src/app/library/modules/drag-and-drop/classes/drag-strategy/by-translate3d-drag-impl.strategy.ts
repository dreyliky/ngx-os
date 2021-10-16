import { Coordinate } from '../../../../core';
import { DragInfo } from '../../interfaces';
import { BaseDragStrategy } from './base-drag.strategy';
import { DragStrategyByTranslate3d } from './by-translate3d-drag.strategy';

/** @internal */
export class DragStrategyByTranslate3dImpl extends BaseDragStrategy {
    protected config: DragStrategyByTranslate3d;

    private readonly totalParentCoordinates: Coordinate = {
        x: 0,
        y: 0
    };

    public registerMouseDown(dragInfo: DragInfo): void {
        super.registerMouseDown(dragInfo);
        this.calculateTotalParentCoordinates(dragInfo.originalEvent);
    }

    public updateElementPosition(event: MouseEvent): void {
        if (this.context.config.isAllowMoveElement) {
            const x = this.calculateElementPositionX(event);
            const y = this.calculateElementPositionY(event);
            this.context.movableElement.style.transform = `translate3d(${x}, ${y}, 0px)`;
        }
    }

    private calculateTotalParentCoordinates(event: MouseEvent): void {
        const parentElements = event.composedPath() as HTMLElement[];
        this.totalParentCoordinates.x = 0;
        this.totalParentCoordinates.y = 0;

        parentElements
            .forEach((parent) => {
                this.totalParentCoordinates.x += (parent.scrollLeft ?? 0);
                this.totalParentCoordinates.y += (parent.scrollTop ?? 0);
            });
    }

    private calculateElementPositionX(event: MouseEvent): string {
        if (this.config.isLockAxisX) {
            return '0px';
        }

        const calculatedPosition = (
            event.clientX - this.initialDomRect.x -
            this.shiftX + this.totalParentCoordinates.x
        );

        return `${calculatedPosition}px`;
    }

    private calculateElementPositionY(event: MouseEvent): string {
        if (this.config.isLockAxisY) {
            return '0px';
        }

        const calculatedPosition = (
            event.clientY - this.initialDomRect.y -
            this.shiftY + this.totalParentCoordinates.y
        );

        return `${calculatedPosition}px`;
    }
}
