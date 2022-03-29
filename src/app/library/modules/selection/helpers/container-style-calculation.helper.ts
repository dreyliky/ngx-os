/** @internal */
export class ɵContainerStyleCalculationHelper {
    private containerElement: HTMLDivElement;
    private initialMouseDownEvent: PointerEvent;
    private zoneElementDomRect: DOMRect;

    constructor(
        private readonly selectionZoneElement: HTMLElement
    ) {}

    public setInitialMouseDownEvent(event: PointerEvent): void {
        this.initialMouseDownEvent = event;
    }

    public setContainerElement(containerElement: HTMLDivElement): void {
        this.containerElement = containerElement;
    }

    public removeContainerElement(): void {
        this.containerElement = null;
    }

    public calculateAll(event: PointerEvent): void {
        this.zoneElementDomRect = this.selectionZoneElement.getBoundingClientRect();

        this.calculateLeft(event);
        this.calculateTop(event);
        this.calculateWidth(event);
        this.calculateHeight(event);
    }

    private calculateLeft(event: PointerEvent): void {
        const { clientX: initialX } = this.initialMouseDownEvent;
        const { x: zoneX } = this.zoneElementDomRect;
        let left = (event.clientX - zoneX);

        if (event.clientX >= this.initialMouseDownEvent.clientX) {
            left = (initialX - zoneX);
        }

        this.containerElement.style.left = `${left}px`;
    }

    private calculateTop(event: PointerEvent): void {
        const { clientY: initialY } = this.initialMouseDownEvent;
        const { y: zoneY } = this.zoneElementDomRect;
        let top = (event.clientY - zoneY);

        if (event.clientY >= this.initialMouseDownEvent.clientY) {
            top = (initialY - zoneY);
        }

        this.containerElement.style.top = `${top}px`;
    }

    private calculateWidth(event: PointerEvent): void {
        const width = Math.abs(event.clientX - this.initialMouseDownEvent.clientX);

        this.containerElement.style.width = `${width}px`;
    }

    private calculateHeight(event: PointerEvent): void {
        const height = Math.abs(event.clientY - this.initialMouseDownEvent.clientY);

        this.containerElement.style.height = `${height}px`;
    }
}
