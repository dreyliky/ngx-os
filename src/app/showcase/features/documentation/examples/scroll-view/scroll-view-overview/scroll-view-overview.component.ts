import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-scroll-view-overview',
    templateUrl: './scroll-view-overview.component.html',
    styleUrls: ['./scroll-view-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewOverviewComponent {}
