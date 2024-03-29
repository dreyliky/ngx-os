export interface RadioButtonValueChangeEvent<T = any> {
    /** Is radio-button checked? */
    isChecked: boolean;
    /** Data of the radio-button */
    data: T;
    /** Original `change` event from HTML `<input>` element */
    originalEvent: Event;
}
