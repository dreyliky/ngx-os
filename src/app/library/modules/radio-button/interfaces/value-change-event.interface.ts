export interface IRadioButtonValueChangeEvent<T> {
    /** Is radio-button checked? */
    isChecked: boolean;
    /** Value of the radio-button */
    value: T;
    /** Original `change` event from HTML `<input>` element */
    originalEvent: Event;
}
