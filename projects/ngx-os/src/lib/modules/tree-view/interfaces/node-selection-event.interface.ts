import { ITreeNode } from './node.interface';

export interface ITreeNodeSelectionEvent<T = any> {
    originalEvent?: MouseEvent;
    target: ITreeNode<T>;
    allSelected: ITreeNode<T>[];
}
