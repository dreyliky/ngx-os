import { TreeNode } from './node.interface';

export interface TreeNodeExpansionEvent<T = any> {
    /** MouseEvent that was the reason for node expansion state changing. Might be undefined if the node is selected from code */
    originalEvent?: MouseEvent;
    /** Node which was expanded or collapsed */
    node: TreeNode<T>;
}
