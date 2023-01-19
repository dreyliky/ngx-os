export interface TreeNodeClickEvent<T = any> {
    /** Event of clicking on node element */
    originalEvent?: MouseEvent;
    /** Node which was clicked */
    node: T;
}
