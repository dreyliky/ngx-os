export interface IRadioButtonValueChangeEvent<T> {
    checked: boolean;
    value: T;
    originalEvent: Event;
}
