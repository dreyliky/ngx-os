import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-draggable-zone-overview',
    templateUrl: './draggable-zone-overview.component.html',
    styleUrls: ['./draggable-zone-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableZoneOverviewComponent {}
