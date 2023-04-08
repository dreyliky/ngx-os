/** @internal */
export abstract class ɵEventOutside {
    public static checkForElement(element: HTMLElement, event: Event): boolean {
        const bubbledElements = event.composedPath() as HTMLElement[];

        return bubbledElements
            .every((currElement) => (currElement !== element));
    }
}
