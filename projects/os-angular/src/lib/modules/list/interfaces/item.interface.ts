export interface ListItem {
    label: string;
    iconUrl: string;
    onDblClick?: (event: MouseEvent) => any;
    onClick?: (event: MouseEvent) => any;
}
