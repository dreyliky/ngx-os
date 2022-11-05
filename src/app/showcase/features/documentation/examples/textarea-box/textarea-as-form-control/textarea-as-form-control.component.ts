import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-textarea-as-form-control',
    templateUrl: './textarea-as-form-control.component.html',
    styleUrls: ['./textarea-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaAsFormControlComponent {
    public readonly textareaBoxControl = new FormControl('Hi there!');
    public readonly textareaBoxDisabledControl = new FormControl({ value: '', disabled: true });

    public readonly formGroup = new FormGroup({
        textareaBoxValue: this.textareaBoxControl
    });
}
