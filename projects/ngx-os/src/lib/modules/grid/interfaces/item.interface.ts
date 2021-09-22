export interface IGridItem {
    label: string;
    iconUrl: string;
    onDblClick?: (event: MouseEvent) => any;
    onClick?: (event: MouseEvent) => any;
}
