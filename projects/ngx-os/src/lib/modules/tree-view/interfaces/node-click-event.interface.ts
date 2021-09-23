import { ITreeNode } from './node.interface';

export interface ITreeNodeClickEvent<T = any> {
    /** Event of clicking on node element */
    originalEvent?: MouseEvent;
    /** Node which was clicked */
    node: ITreeNode<T>
}
