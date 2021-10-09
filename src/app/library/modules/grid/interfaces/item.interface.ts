/** Data structure used as grid item data */
export interface IGridItem {
    /** Label text of the grid item */
    label: string;
    /** Icon URL of the grid item */
    iconUrl: string;
    /** Double click handler for grid item */
    onDblClick?: (event: MouseEvent) => void;
    /** Click handler for grid item */
    onClick?: (event: MouseEvent) => void;
}
