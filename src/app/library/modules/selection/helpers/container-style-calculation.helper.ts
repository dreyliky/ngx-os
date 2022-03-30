import { ɵPointerHelper } from '../../../core';
import { SelectionZoneDirective } from '../directives/selection-zone.directive';

/** @internal */
export class ɵContainerStyleCalculationHelper {
    private zoneElementDomRect: DOMRect;

    constructor(
        private readonly context: SelectionZoneDirective
    ) {}

    public calculateAll(event: PointerEvent | TouchEvent): void {
        this.zoneElementDomRect = this.context._zoneHtmlElement.getBoundingClientRect();

        this.calculateLeft(event);
        this.calculateTop(event);
        this.calculateWidth(event);
        this.calculateHeight(event);
    }

    private calculateLeft(event: PointerEvent | TouchEvent): void {
        const initialX = ɵPointerHelper.getClientX(this.context._initialPointerDownEvent);
        const eventClientX = ɵPointerHelper.getClientX(event);
        const { x: zoneX } = this.zoneElementDomRect;
        let left = (eventClientX - zoneX);

        if (eventClientX >= initialX) {
            left = (initialX - zoneX);
        }

        this.context._containerElement.style.left = `${left}px`;
    }

    private calculateTop(event: PointerEvent | TouchEvent): void {
        const initialY = ɵPointerHelper.getClientY(this.context._initialPointerDownEvent);
        const eventClientY = ɵPointerHelper.getClientY(event);
        const { y: zoneY } = this.zoneElementDomRect;
        let top = (eventClientY - zoneY);

        if (eventClientY >= initialY) {
            top = (initialY - zoneY);
        }

        this.context._containerElement.style.top = `${top}px`;
    }

    private calculateWidth(event: PointerEvent | TouchEvent): void {
        const initialClientX = ɵPointerHelper.getClientX(this.context._initialPointerDownEvent);
        const eventClientX = ɵPointerHelper.getClientX(event);
        const width = Math.abs(eventClientX - initialClientX);

        this.context._containerElement.style.width = `${width}px`;
    }

    private calculateHeight(event: PointerEvent | TouchEvent): void {
        const initialClientY = ɵPointerHelper.getClientY(this.context._initialPointerDownEvent);
        const eventClientY = ɵPointerHelper.getClientY(event);
        const height = Math.abs(eventClientY - initialClientY);

        this.context._containerElement.style.height = `${height}px`;
    }
}
