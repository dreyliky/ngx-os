import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-group-box',
    templateUrl: './group-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent extends OsBaseComponent {
    @Input()
    public label: string;
}
