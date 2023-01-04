import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-checkbox-as-form-control',
    templateUrl: './checkbox-as-form-control.component.html',
    styleUrls: ['./checkbox-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxAsFormControlComponent {
    public readonly checkboxControl1 = new UntypedFormControl(false);
    public readonly checkboxControl2 = new UntypedFormControl(true);
    public readonly checkboxControl3 = new UntypedFormControl({ value: false, disabled: true });

    public readonly formGroup = new UntypedFormGroup({
        checkbox1: this.checkboxControl1,
        checkbox2: this.checkboxControl2,
        checkbox3: this.checkboxControl3
    });
}
