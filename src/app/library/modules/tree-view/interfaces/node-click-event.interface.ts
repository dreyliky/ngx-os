import { TreeNode } from './node.interface';

export interface TreeNodeClickEvent<T = any> {
    /** Event of clicking on node element */
    originalEvent?: PointerEvent;
    /** Node which was clicked */
    node: TreeNode<T>
}
