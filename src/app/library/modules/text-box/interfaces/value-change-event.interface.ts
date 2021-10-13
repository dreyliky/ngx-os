export interface TextBoxChangeEvent {
    /** Value of the text-box */
    value: string;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
