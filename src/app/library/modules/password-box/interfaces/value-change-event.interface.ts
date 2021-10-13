export interface PasswordBoxChangeEvent {
    /** Value of the password-box */
    value: string;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
