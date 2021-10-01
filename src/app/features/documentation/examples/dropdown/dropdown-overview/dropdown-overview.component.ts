import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-dropdown-overview',
    templateUrl: './dropdown-overview.component.html',
    styleUrls: ['./dropdown-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOverviewComponent {}
