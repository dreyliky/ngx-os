import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DEFAULT_EMAIL_VALIDATION_PATTERN } from '../data';

export function EmailValidator(
    pattern: RegExp = DEFAULT_EMAIL_VALIDATION_PATTERN
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = pattern.test(control.value);

        return (isValid) ? null : { emailInvalid: true };
    };
}
