import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-email-box-as-form-control',
    templateUrl: './email-box-as-form-control.component.html',
    styleUrls: ['./email-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxAsFormControlComponent {
    public readonly emailBoxControl = new UntypedFormControl('');
    public readonly emailBoxDisabledControl = new UntypedFormControl({ value: '', disabled: true });

    public readonly formGroup = new UntypedFormGroup({
        emailBoxValue: this.emailBoxControl
    });
}
