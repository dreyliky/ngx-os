import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-input-as-form-control',
    templateUrl: './input-as-form-control.component.html',
    styleUrls: ['./input-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAsFormControlComponent {
    public readonly inputControl = new UntypedFormControl('Hi there!');
    public readonly inputDisabledControl = new UntypedFormControl({ value: '', disabled: true });

    public readonly formGroup = new UntypedFormGroup({
        inputValue: this.inputControl
    });
}
