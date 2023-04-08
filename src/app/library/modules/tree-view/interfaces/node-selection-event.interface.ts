import { TreeNode } from './node.interface';

export interface TreeNodeSelectionEvent<T = any> {
    /** PointerEvent that was the reason for node selection state changing. Might be undefined if the node is selected from code */
    originalEvent?: PointerEvent;
    /** Node which was selected or deselected */
    node: TreeNode<T>;
    /** An array of all presently selected nodes */
    allSelected: TreeNode<T>[];
}
