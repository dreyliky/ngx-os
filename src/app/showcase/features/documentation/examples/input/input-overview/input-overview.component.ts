import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'showcase-input-overview',
    templateUrl: './input-overview.component.html',
    styleUrls: ['./input-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputOverviewComponent {
    public disabledInputControl = new UntypedFormControl({ value: '', disabled: true });
}
