import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-password-box-as-form-control',
    templateUrl: './password-box-as-form-control.component.html',
    styleUrls: ['./password-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordBoxAsFormControlComponent {
    public readonly formGroup = new FormGroup({
        passwordBoxValue: new FormControl()
    });
}
