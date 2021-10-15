export interface DropdownValueChangeEvent<T> {
    /** Data of the dropdown */
    data: T;
    /** Original `change` event from HTML element */
    originalEvent: MouseEvent;
}
