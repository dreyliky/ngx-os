export interface RadioButtonValueChangeEvent<T> {
    checked: boolean;
    value: T;
    originalEvent: Event;
}
