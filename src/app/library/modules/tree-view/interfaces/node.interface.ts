import { ITreeNodeClickEvent } from './node-click-event.interface';
import { ITreeNodeExpansionEvent } from './node-expansion-event.interface';
import { ITreeNodeSelectionEvent } from './node-selection-event.interface';

export interface ITreeNode<T = any> {
    /** Text of the node to display for the user */
    label: string;
    /** Custom data that node represents */
    data?: T;
    /** An array of children nodes which can be expanded or collapsed in the tree */
    children?: ITreeNode<T>[];
    /** Node element stylelist */
    style?: object;
    /** Node element classList */
    styleClass?: string;
    /** Node expand button element stylelist */
    iconStyle?: object;
    /** Node expand button element classList */
    iconStyleClass?: string;
    /** Is node disabled */
    isDisabled?: boolean;
    /** Is node need to be expanded when TreeViewComponent will be rendered first time */
    isExpandedByDefault?: boolean;
    /** Is node need to be selected when TreeViewComponent will be rendered first time */
    isSelectedByDefault?: boolean;
    /** Callback which fires when the user clicks on the node element */
    onClick?: (event: ITreeNodeClickEvent<T>) => void;
    /** Callback which fires when node expands */
    onExpanded?: (event: ITreeNodeExpansionEvent<T>) => void;
    /** Callback which fires when node collapses */
    onCollapsed?: (event: ITreeNodeExpansionEvent<T>) => void;
    /** Callback which fires when node selects */
    onSelected?: (event: ITreeNodeSelectionEvent<T>) => void;
    /** Callback which fires when node deselects */
    onDeselected?: (event: ITreeNodeSelectionEvent<T>) => void;
}
