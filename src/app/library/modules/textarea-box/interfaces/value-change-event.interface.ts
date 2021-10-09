export interface ITextareaBoxChangeEvent {
    /** Value of the textarea-box */
    value: string;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
