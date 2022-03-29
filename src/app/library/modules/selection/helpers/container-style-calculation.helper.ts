import { SelectionZoneDirective } from '../directives/selection-zone.directive';

/** @internal */
export class ɵContainerStyleCalculationHelper {
    private zoneElementDomRect: DOMRect;

    constructor(
        private readonly context: SelectionZoneDirective
    ) {}

    public calculateAll(event: PointerEvent): void {
        this.zoneElementDomRect = this.context._zoneHtmlElement.getBoundingClientRect();

        this.calculateLeft(event);
        this.calculateTop(event);
        this.calculateWidth(event);
        this.calculateHeight(event);
    }

    private calculateLeft(event: PointerEvent): void {
        const { clientX: initialX } = this.context._initialMouseDownEvent;
        const { x: zoneX } = this.zoneElementDomRect;
        let left = (event.clientX - zoneX);

        if (event.clientX >= initialX) {
            left = (initialX - zoneX);
        }

        this.context._containerElement.style.left = `${left}px`;
    }

    private calculateTop(event: PointerEvent): void {
        const { clientY: initialY } = this.context._initialMouseDownEvent;
        const { y: zoneY } = this.zoneElementDomRect;
        let top = (event.clientY - zoneY);

        if (event.clientY >= initialY) {
            top = (initialY - zoneY);
        }

        this.context._containerElement.style.top = `${top}px`;
    }

    private calculateWidth(event: PointerEvent): void {
        const width = Math.abs(event.clientX - this.context._initialMouseDownEvent.clientX);

        this.context._containerElement.style.width = `${width}px`;
    }

    private calculateHeight(event: PointerEvent): void {
        const height = Math.abs(event.clientY - this.context._initialMouseDownEvent.clientY);

        this.context._containerElement.style.height = `${height}px`;
    }
}
