import { isNil } from '@lib-helpers';
import { DragStrategyType, IDragInfo } from '@lib-modules';
import { DraggableDirective } from '../../directives/draggable.directive';

export abstract class BaseDragStrategy {
    protected initialDomRect: DOMRect;
    protected mouseDownEvent: MouseEvent;
    protected shiftX: number;
    protected shiftY: number;
    protected config: DragStrategyType;

    constructor(
        protected readonly context: DraggableDirective
    ) {
        this.initialDomRect = this.context.movableElement.getBoundingClientRect();
        this.config = this.context.config.strategy;
    }

    public registerMouseDown({ mouseEvent, movableElement }: IDragInfo): void {
        const elementDomRect = movableElement.getBoundingClientRect();
        this.mouseDownEvent = mouseEvent;

        this.setShiftX(mouseEvent, elementDomRect);
        this.setShiftY(mouseEvent, elementDomRect);
    }

    private setShiftX(event: MouseEvent, elementDomRect: DOMRect): void {
        if (!isNil(this.context.config.shiftX)) {
            this.shiftX = this.context.config.shiftX;
        } else {
            this.shiftX = event.clientX - elementDomRect.left + scrollX;
        }
    }

    private setShiftY(event: MouseEvent, elementDomRect: DOMRect): void {
        if (!isNil(this.context.config.shiftY)) {
            this.shiftY = this.context.config.shiftY;
        } else {
            this.shiftY = event.clientY - elementDomRect.top + scrollY;
        }
    }

    public abstract updateElementPosition(event: MouseEvent): void;
}
