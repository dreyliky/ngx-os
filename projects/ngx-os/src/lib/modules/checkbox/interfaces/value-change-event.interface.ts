export interface CheckboxValueChangeEvent<T> {
    checked: boolean;
    value: T;
    originalEvent: Event;
}
