export interface DropdownValueChangeEvent<T = any> {
    /** Data of the dropdown */
    data: T;
    /** Original `change` event from HTML element */
    originalEvent: MouseEvent;
}
