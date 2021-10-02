import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-dropdown-overview',
    templateUrl: './dropdown-overview.component.html',
    styleUrls: ['./dropdown-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOverviewComponent {}
