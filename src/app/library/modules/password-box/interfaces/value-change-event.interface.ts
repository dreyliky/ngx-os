export interface IPasswordBoxChangeEvent {
    /** Value of the password-box */
    value: string;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
