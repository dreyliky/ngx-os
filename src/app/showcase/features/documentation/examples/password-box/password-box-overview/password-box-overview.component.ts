import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-password-box-overview',
    templateUrl: './password-box-overview.component.html',
    styleUrls: ['./password-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordBoxOverviewComponent {
    public readonly formGroup = new FormGroup({
        passwordBoxValue: new FormControl()
    });
}
