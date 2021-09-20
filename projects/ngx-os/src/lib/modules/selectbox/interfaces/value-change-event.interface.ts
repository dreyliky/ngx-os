export interface SelectboxValueChangeEvent<T> {
    value: T;
    originalEvent: MouseEvent | KeyboardEvent;
}
