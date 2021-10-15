/** @internal */
export abstract class EventOutside {
    public static checkForElement(element: HTMLElement, event: Event): boolean {
        const bubbledElements = event.composedPath() as HTMLElement[];

        return bubbledElements
            .every((currElement) => (currElement !== element));
    }
}
