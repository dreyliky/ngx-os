import { ɵIsNil } from '../../../../core';
import { DraggableDirective } from '../../directives/draggable.directive';
import { ɵDragStrategyEnum } from '../../enums';
import { DragInfo } from '../../interfaces';
import { DragStrategyType } from '../../types';

/** @internal */
export abstract class ɵBaseDragStrategyImpl {
    public readonly type: ɵDragStrategyEnum;

    protected mouseDownEvent: MouseEvent;
    protected shiftX: number;
    protected shiftY: number;
    protected config: DragStrategyType;

    constructor(
        protected readonly context: DraggableDirective
    ) {
        this.config = this.context.config.strategy;
    }

    public registerMouseDown({ originalEvent: mouseEvent, movableElement }: DragInfo): void {
        const elementDomRect = movableElement.getBoundingClientRect();
        this.mouseDownEvent = mouseEvent;

        this.setShiftX(mouseEvent, elementDomRect);
        this.setShiftY(mouseEvent, elementDomRect);
    }

    private setShiftX(event: MouseEvent, elementDomRect: DOMRect): void {
        if (!ɵIsNil(this.context.config.shiftX)) {
            this.shiftX = this.context.config.shiftX;
        } else {
            this.shiftX = event.clientX - elementDomRect.left + scrollX;
        }
    }

    private setShiftY(event: MouseEvent, elementDomRect: DOMRect): void {
        if (!ɵIsNil(this.context.config.shiftY)) {
            this.shiftY = this.context.config.shiftY;
        } else {
            this.shiftY = event.clientY - elementDomRect.top + scrollY;
        }
    }

    public abstract updateElementPosition(event: MouseEvent): void;
}
