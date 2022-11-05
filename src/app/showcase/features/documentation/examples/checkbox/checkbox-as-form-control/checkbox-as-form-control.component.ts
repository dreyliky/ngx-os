import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-checkbox-as-form-control',
    templateUrl: './checkbox-as-form-control.component.html',
    styleUrls: ['./checkbox-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxAsFormControlComponent {
    public readonly checkboxControl1 = new FormControl(false);
    public readonly checkboxControl2 = new FormControl(true);
    public readonly checkboxControl3 = new FormControl({ value: false, disabled: true });

    public readonly formGroup = new FormGroup({
        checkbox1: this.checkboxControl1,
        checkbox2: this.checkboxControl2,
        checkbox3: this.checkboxControl3
    });
}
