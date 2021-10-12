import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-number-box-as-form-control',
    templateUrl: './number-box-as-form-control.component.html',
    styleUrls: ['./number-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBoxAsFormControlComponent {
    public readonly formGroup = new FormGroup({
        numberBoxValue: new FormControl()
    });
}
