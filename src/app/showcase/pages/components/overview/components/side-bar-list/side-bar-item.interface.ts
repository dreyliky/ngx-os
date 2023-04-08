export interface SideBarItem {
    label: string;
    sectionUrl: string;
    id?: string;
    isExpandedByDefault?: boolean;
    isSelectedByDefault?: boolean;
    imageUrl?: string;
    children?: SideBarItem[];
}
