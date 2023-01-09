import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-textarea-as-form-control',
    templateUrl: './textarea-as-form-control.component.html',
    styleUrls: ['./textarea-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaAsFormControlComponent {
    public readonly textareaBoxControl = new UntypedFormControl('Hi there!');
    public readonly textareaBoxDisabledControl = new UntypedFormControl({
        value: '',
        disabled: true
    });

    public readonly formGroup = new UntypedFormGroup({
        textareaBoxValue: this.textareaBoxControl
    });
}
