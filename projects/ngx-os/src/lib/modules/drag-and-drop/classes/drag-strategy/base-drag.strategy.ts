import { DragStrategyType } from '@lib-modules';
import { DraggableDirective } from '../../directives/draggable.directive';

export abstract class BaseDragStrategy {
    protected initialDomRect: DOMRect;
    protected mouseDownEvent: MouseEvent;
    protected config: DragStrategyType;

    constructor(
        protected readonly context: DraggableDirective
    ) {
        this.initialDomRect = this.context.movableElement.getBoundingClientRect();
        this.config = this.context.config.strategy;
    }

    public registerMouseDownEvent(event: MouseEvent): void {
        this.mouseDownEvent = event;
    }

    public abstract updateElementPosition(event: MouseEvent): void;
}
