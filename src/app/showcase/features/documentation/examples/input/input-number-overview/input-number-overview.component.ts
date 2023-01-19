import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'showcase-input-number-overview',
    templateUrl: './input-number-overview.component.html',
    styleUrls: ['./input-number-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberOverviewComponent {
    public disabledInputControl = new UntypedFormControl({ value: 0, disabled: true });
}
