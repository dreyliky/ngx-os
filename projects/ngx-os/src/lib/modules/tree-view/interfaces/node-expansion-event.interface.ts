import { ITreeNode } from './node.interface';

export interface ITreeNodeExpansionEvent<T> {
    /** MouseEvent that was the reason for node expansion state changing. Might be undefined if the node is selected from code */
    originalEvent?: MouseEvent;
    /** Node which was expanded or collapsed */
    node: ITreeNode<T>;
}
