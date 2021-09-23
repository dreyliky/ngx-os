import { ITreeNode } from './node.interface';

export interface ITreeNodeClickEvent<T = any> {
    originalEvent?: MouseEvent;
    node: ITreeNode<T>
}
