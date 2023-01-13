import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'showcase-checkbox-overview',
    templateUrl: './checkbox-overview.component.html',
    styleUrls: ['./checkbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxOverviewComponent {
    public readonly disabledUncheckedControl = new UntypedFormControl({
        value: false,
        disabled: true
    });

    public readonly disabledCheckedControl = new UntypedFormControl({
        value: true,
        disabled: true
    });
}
