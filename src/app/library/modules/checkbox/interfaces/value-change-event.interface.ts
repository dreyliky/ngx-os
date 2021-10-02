export interface ICheckboxValueChangeEvent<T> {
    checked: boolean;
    value: T;
    originalEvent: Event;
}
