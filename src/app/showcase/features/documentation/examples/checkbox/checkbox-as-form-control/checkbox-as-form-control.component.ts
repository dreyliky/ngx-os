import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-checkbox-as-form-control',
    templateUrl: './checkbox-as-form-control.component.html',
    styleUrls: ['./checkbox-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxAsFormControlComponent {
    public readonly formGroup = new FormGroup({
        checkbox1: new FormControl(false),
        checkbox2: new FormControl(true)
    });
}
