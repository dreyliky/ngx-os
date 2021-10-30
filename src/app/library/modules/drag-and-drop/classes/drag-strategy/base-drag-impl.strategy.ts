import { first } from 'rxjs/operators';
import { isNil } from '../../../../core';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DragStrategyEnum } from '../../enums';
import { DragInfo } from '../../interfaces';
import { DragStrategyType } from '../../types';

/** @internal */
export abstract class BaseDragStrategyImpl {
    public readonly type: DragStrategyEnum;

    protected initialDomRect: DOMRect;
    protected mouseDownEvent: MouseEvent;
    protected shiftX: number;
    protected shiftY: number;
    protected config: DragStrategyType;

    constructor(
        protected readonly context: DraggableDirective
    ) {
        this.config = this.context.config.strategy;

        this.initAfterViewInitObserver();
    }

    public registerMouseDown({ originalEvent: mouseEvent, movableElement }: DragInfo): void {
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

    private initAfterViewInitObserver(): void {
        this.context.whenViewInit$
            .pipe(first())
            .subscribe(() => {
                this.initialDomRect = this.context.movableElement.getBoundingClientRect();
            });
    }

    public abstract updateElementPosition(event: MouseEvent): void;
}
