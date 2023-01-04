import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-text-box-as-form-control',
    templateUrl: './text-box-as-form-control.component.html',
    styleUrls: ['./text-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxAsFormControlComponent {
    public readonly textBoxControl = new UntypedFormControl('Hi there!');
    public readonly textBoxDisabledControl = new UntypedFormControl({ value: '', disabled: true });

    public readonly formGroup = new UntypedFormGroup({
        textBoxValue: this.textBoxControl
    });
}
