import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-button-overview',
    templateUrl: './button-overview.component.html',
    styleUrls: ['./button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonOverviewComponent {}
