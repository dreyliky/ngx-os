import { ITreeNode } from './node.interface';

export interface ITreeNodeExpansionEvent<T> {
    originalEvent: MouseEvent;
    node: ITreeNode<T>;
}
