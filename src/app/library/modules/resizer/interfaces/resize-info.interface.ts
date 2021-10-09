/** Data structure that emits by events of {@link DraggableDirective} */
export interface IResizeInfo {
    /** Target resizable HTML element. Useful to read properties about current position and size */
    resizableElement: HTMLElement;
    /** Original mouse event from movable HTML element */
    originalEvent: MouseEvent;
}
