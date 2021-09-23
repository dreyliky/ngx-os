import { ITreeNodeClickEvent } from './node-click-event.interface';
import { ITreeNodeExpansionEvent } from './node-expansion-event.interface';
import { ITreeNodeSelectionEvent } from './node-selection-event.interface';

export interface ITreeNode<T = any> {
    label: string;
    data?: T;
    children?: ITreeNode<T>[];
    style?: object;
    styleClass?: string;
    iconStyle?: object;
    iconStyleClass?: string;
    isDisabled?: boolean;
    isExpandedByDefault?: boolean;
    isSelectedByDefault?: boolean;
    onClick?: (event: ITreeNodeClickEvent<T>) => void;
    onExpanded?: (event: ITreeNodeExpansionEvent<T>) => void;
    onCollapsed?: (event: ITreeNodeExpansionEvent<T>) => void;
    onSelected?: (event: ITreeNodeSelectionEvent<T>) => void;
    onDeselected?: (event: ITreeNodeSelectionEvent<T>) => void;
}
