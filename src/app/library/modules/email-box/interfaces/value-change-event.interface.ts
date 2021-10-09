export interface IEmailBoxChangeEvent {
    /** Value of the email-box */
    value: string;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
