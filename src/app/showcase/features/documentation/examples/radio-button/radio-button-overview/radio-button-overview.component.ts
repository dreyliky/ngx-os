import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'showcase-radio-button-overview',
    templateUrl: './radio-button-overview.component.html',
    styleUrls: ['./radio-button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonOverviewComponent {
    public readonly radioButtonDisabledControl = new UntypedFormControl({
        value: 1,
        disabled: true
    });
}
