export interface ITreeNode<T = any> {
    label: string;
    data?: T;
    children?: ITreeNode<T>[];
    iconStyle?: object;
    iconStyleClass?: string;
    style?: object;
    styleClass?: string;
    isExpanded?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
}
