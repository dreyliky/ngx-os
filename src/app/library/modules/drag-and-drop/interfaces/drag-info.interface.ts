/** Model that emits by events of {@link DraggableDirective} */
export interface DragInfo {
    /** Target movable HTML element. Useful to read properties about current position and size */
    movableElement: HTMLElement;
    /** Original mouse event from movable HTML element */
    originalEvent: PointerEvent | TouchEvent;
}
