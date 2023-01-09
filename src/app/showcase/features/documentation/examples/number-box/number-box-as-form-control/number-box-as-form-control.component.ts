import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-number-box-as-form-control',
    templateUrl: './number-box-as-form-control.component.html',
    styleUrls: ['./number-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBoxAsFormControlComponent {
    public readonly numberBoxControl = new UntypedFormControl();
    public readonly numberBoxDisabledControl = new UntypedFormControl({
        value: '',
        disabled: true
    });

    public readonly formGroup = new UntypedFormGroup({
        numberBoxValue: this.numberBoxControl
    });
}
