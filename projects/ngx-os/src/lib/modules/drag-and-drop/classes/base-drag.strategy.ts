import { DraggableDirective } from '../directives/draggable.directive';

export abstract class BaseDragStrategy {
    protected initialDomRect: DOMRect;

    constructor(
        protected readonly context: DraggableDirective
    ) {
        this.initialDomRect = this.context.movableElement.getBoundingClientRect();
    }

    public abstract updateElementPosition(event: MouseEvent): void;
}
