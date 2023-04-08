import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-menu-bar-overview',
    templateUrl: './menu-bar-overview.component.html',
    styleUrls: ['./menu-bar-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarOverviewComponent {}
