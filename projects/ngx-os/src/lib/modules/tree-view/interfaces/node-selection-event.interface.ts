import { ITreeNode } from './node.interface';

export interface ITreeNodeSelectionEvent<T = any> {
    /** MouseEvent that was the reason for node selection state changing. Might be undefined if the node is selected from code */
    originalEvent?: MouseEvent;
    /** Node which was selected or deselected */
    node: ITreeNode<T>;
    /** An array of all presently selected nodes */
    allSelected: ITreeNode<T>[];
}
