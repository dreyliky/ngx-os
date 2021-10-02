export interface IDropdownValueChangeEvent<T> {
    value: T;
    originalEvent: MouseEvent | KeyboardEvent;
}
