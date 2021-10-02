import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-text-overview',
    templateUrl: './text-overview.component.html',
    styleUrls: ['./text-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextOverviewComponent {}
