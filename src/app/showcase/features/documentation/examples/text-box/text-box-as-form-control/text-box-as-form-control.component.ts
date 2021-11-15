import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-text-box-as-form-control',
    templateUrl: './text-box-as-form-control.component.html',
    styleUrls: ['./text-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxAsFormControlComponent {
    public readonly textBoxControl = new FormControl('Hi there!');

    public readonly formGroup = new FormGroup({
        textBoxValue: this.textBoxControl
    });
}
