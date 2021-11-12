export interface CheckboxValueChangeEvent<T = any> {
    /** Is checkbox checked? */
    isChecked: boolean;
    /** Data of the checkbox */
    data: T;
    /** Original `change` event from HTML `<input>` element */
    originalEvent: Event;
}
