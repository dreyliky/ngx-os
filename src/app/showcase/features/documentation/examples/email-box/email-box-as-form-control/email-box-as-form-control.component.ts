import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-email-box-as-form-control',
    templateUrl: './email-box-as-form-control.component.html',
    styleUrls: ['./email-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxAsFormControlComponent {
    public readonly formGroup = new FormGroup({
        emailBoxValue: new FormControl('')
    });
}
