import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-password-box-overview',
    templateUrl: './password-box-overview.component.html',
    styleUrls: ['./password-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordBoxOverviewComponent {
    public readonly formGroup = new UntypedFormGroup({
        passwordBoxValue: new UntypedFormControl()
    });
}
