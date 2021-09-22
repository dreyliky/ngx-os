export interface ISelectboxValueChangeEvent<T> {
    value: T;
    originalEvent: MouseEvent | KeyboardEvent;
}
