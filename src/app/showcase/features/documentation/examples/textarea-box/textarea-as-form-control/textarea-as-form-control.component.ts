import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-textarea-as-form-control',
    templateUrl: './textarea-as-form-control.component.html',
    styleUrls: ['./textarea-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaAsFormControlComponent {
    public readonly formGroup = new FormGroup({
        textareaBoxValue: new FormControl('Hi there!')
    });
}
