export interface TreeNodeExpansionEvent<T = any> {
    /** PointerEvent that was the reason for node expansion state changing. Might be undefined if the node is selected from code */
    originalEvent?: PointerEvent;
    /** Node which was expanded or collapsed */
    node: T;
}
