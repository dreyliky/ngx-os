import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-textarea-overview',
    templateUrl: './textarea-overview.component.html',
    styleUrls: ['./textarea-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaOverviewComponent {
    public readonly formGroup = new UntypedFormGroup({
        textareaBoxValue: new UntypedFormControl('Hi there!')
    });
}
