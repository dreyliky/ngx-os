import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'showcase-email-box-validity-overview',
    templateUrl: './email-box-validity-overview.component.html',
    styleUrls: ['./email-box-validity-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxValidityOverviewComponent {
    public readonly emailControl = new FormControl('my-mail@gmail.com');
}
