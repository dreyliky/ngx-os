export interface TreeNodeSelectionEvent<T = any> {
    /** PointerEvent that was the reason for node selection state changing. Might be undefined if the node is selected from code */
    originalEvent?: MouseEvent;
    /** Node which was selected or deselected */
    node: T;
    /** An array of all presently selected nodes */
    allSelected: T[];
}
