export interface EmailBoxChangeEvent {
    /** Value of the email-box */
    value: string;
    /** Is email valid */
    isValid: boolean;
    /** Original `change` event from HTML `input` element */
    originalEvent: Event;
}
