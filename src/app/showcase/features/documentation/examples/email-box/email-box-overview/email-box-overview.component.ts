import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-email-box-overview',
    templateUrl: './email-box-overview.component.html',
    styleUrls: ['./email-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxOverviewComponent {
    public readonly formGroup = new FormGroup({
        emailBoxValue: new FormControl()
    });
}
