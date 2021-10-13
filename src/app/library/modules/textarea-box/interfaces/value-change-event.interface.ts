export interface TextareaBoxChangeEvent {
    /** Value of the textarea-box */
    value: string;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
