import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-text-box-overview',
    templateUrl: './text-box-overview.component.html',
    styleUrls: ['./text-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxOverviewComponent {
    public readonly formGroup = new UntypedFormGroup({
        textboxValue: new UntypedFormControl('Hi there!')
    });
}
