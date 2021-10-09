export interface ICheckboxValueChangeEvent<T> {
    /** Is checkbox checked? */
    isChecked: boolean;
    /** Value of the checkbox */
    value: T;
    /** Original `change` event from HTML `<input>` element */
    originalEvent: Event;
}
