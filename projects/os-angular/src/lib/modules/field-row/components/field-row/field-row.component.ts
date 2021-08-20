import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-field-row',
    templateUrl: './field-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowComponent extends OsBaseComponent {
    @Input()
    public stacked: boolean = false;
}
