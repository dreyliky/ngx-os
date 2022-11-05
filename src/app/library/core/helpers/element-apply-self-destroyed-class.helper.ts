/** @internal */
export function ɵApplyAutoDestroyClass(
    element: HTMLElement,
    className: string,
    destroyDelay: number = 500
): void {
    element.classList.add(className);

    setTimeout(() => {
        element.classList.remove(className);
    }, destroyDelay);
}
