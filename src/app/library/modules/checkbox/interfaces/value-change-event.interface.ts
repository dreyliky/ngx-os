export interface ICheckboxValueChangeEvent<T> {
    /** Is checkbox checked? */
    isChecked: boolean;
    /** Data of the checkbox */
    data: T;
    /** Original `change` event from HTML `<input>` element */
    originalEvent: Event;
}
