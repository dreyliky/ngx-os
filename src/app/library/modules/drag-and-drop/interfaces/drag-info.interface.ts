/** Object with data that emits by events of {@link DraggableDirective} */
export interface IDragInfo {
    /** Target movable HTML element. Useful to read properties about current position and size */
    movableElement: HTMLElement;
    /** Original mouse event from movable HTML element */
    originalEvent: MouseEvent;
}
