/** @internal */
export abstract class EventOutside {
    public static checkForElement(element: HTMLElement, event: Event): boolean {
        const bubbledElements: HTMLElement[] = event.composedPath() as any;

        return bubbledElements
            .every((currElement) => (currElement !== element));
    }
}
