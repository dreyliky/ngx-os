import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-form-field-overview',
    templateUrl: './form-field-overview.component.html',
    styleUrls: ['./form-field-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldOverviewComponent {
    public isFieldsStacked = false;
}
