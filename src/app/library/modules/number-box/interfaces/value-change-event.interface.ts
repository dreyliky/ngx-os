export interface INumberBoxChangeEvent {
    /** Value of the number-box */
    value: number;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
