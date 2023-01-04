import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { EmailValidator } from 'ngx-os';

@Component({
    selector: 'showcase-email-box-validity-overview',
    templateUrl: './email-box-validity-overview.component.html',
    styleUrls: ['./email-box-validity-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxValidityOverviewComponent {
    public readonly emailControl = new UntypedFormControl(
        'my-mail@gmail.com',
        EmailValidator()
    );
}
