export interface SliderValueChangeEvent {
    /** Value of the slider */
    value: number;
    /** Original `change` event from HTML `<input>` element */
    originalEvent: Event;
}
