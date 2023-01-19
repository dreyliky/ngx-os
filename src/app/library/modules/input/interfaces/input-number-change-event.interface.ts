export interface InputNumberChangeEvent {
    /** Value of the input-number */
    readonly value: number;
    /** Original `change` event from HTML `input` element */
    readonly originalEvent: Event;
}
