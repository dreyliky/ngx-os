import { TreeNodeClickEvent } from './node-click-event.interface';
import { TreeNodeExpansionEvent } from './node-expansion-event.interface';
import { TreeNodeSelectionEvent } from './node-selection-event.interface';

/** Model used as tree node item data */
export interface TreeNode<T = any> {
    /** Text of the node to display for the user */
    label?: string;
    /** Custom data that node represents */
    data?: T;
    /** An array of children nodes which can be expanded or collapsed in the tree */
    children?: TreeNode<T>[];
    /** Node element id */
    id?: string;
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
    /** Is node expanded */
    isExpanded?: boolean;
    /** Is node selected */
    isSelected?: boolean;
    /** Callback which fires when the user clicks on the node element */
    onClick?: (event: TreeNodeClickEvent<T>) => void;
    /** Callback which fires when node expands */
    onExpanded?: (event: TreeNodeExpansionEvent<T>) => void;
    /** Callback which fires when node collapses */
    onCollapsed?: (event: TreeNodeExpansionEvent<T>) => void;
    /** Callback which fires when node selects */
    onSelected?: (event: TreeNodeSelectionEvent<T>) => void;
    /** Callback which fires when node deselects */
    onDeselected?: (event: TreeNodeSelectionEvent<T>) => void;
}
