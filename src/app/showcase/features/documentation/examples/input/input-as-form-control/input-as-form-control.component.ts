import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'showcase-input-as-form-control',
    templateUrl: './input-as-form-control.component.html',
    styleUrls: ['./input-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAsFormControlComponent {
    public readonly inputControl = new UntypedFormControl('Hi there!');
    public readonly inputNumberControl = new UntypedFormControl(123);
    public readonly inputPasswordControl = new UntypedFormControl();
    public readonly textareaControl = new UntypedFormControl('Hi there!');
}
