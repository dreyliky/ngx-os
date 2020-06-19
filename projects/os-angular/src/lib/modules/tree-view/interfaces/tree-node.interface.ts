export interface TreeNode<T> {
    label: string;
    data?: T;
    iconClass?: string;
    expandedIconClass?: string;
    collapsedIconClass?: string;
    children?: TreeNode<T>[];
    parent?: TreeNode<T>;
    style?: string;
    styleClass?: string;
    expanded?: boolean;
    key?: string;
}
