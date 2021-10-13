export interface DropdownValueChangeEvent<T> {
    /** Value of the dropdown */
    value: T;
    /** Original `change` event from HTML element */
    originalEvent: MouseEvent;
}
