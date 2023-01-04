import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-password-box-as-form-control',
    templateUrl: './password-box-as-form-control.component.html',
    styleUrls: ['./password-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordBoxAsFormControlComponent {
    public readonly passwordBoxControl = new UntypedFormControl();
    public readonly passwordBoxDisabledControl = new UntypedFormControl({ value: '', disabled: true });

    public readonly formGroup = new UntypedFormGroup({
        passwordBoxValue: this.passwordBoxControl
    });
}
