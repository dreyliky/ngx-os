import { ITreeNode } from './node.interface';

export interface ITreeNodeSelectionEvent<T = any> {
    target: ITreeNode<T>;
    allSelected: ITreeNode<T>[];
}
