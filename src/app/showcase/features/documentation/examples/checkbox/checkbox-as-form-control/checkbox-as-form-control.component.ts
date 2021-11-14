import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-checkbox-as-form-control',
    templateUrl: './checkbox-as-form-control.component.html',
    styleUrls: ['./checkbox-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxAsFormControlComponent {
    public readonly checkbox1Control = new FormControl(false);
    public readonly checkbox2Control = new FormControl(false);

    public readonly formGroup = new FormGroup({
        checkbox1: this.checkbox1Control,
        checkbox2: this.checkbox2Control
    });
}
