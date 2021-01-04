export interface GridItem {
    label: string;
    iconUrl: string;
    onDblClick?: (event: MouseEvent) => any;
    onClick?: (event: MouseEvent) => any;
}
