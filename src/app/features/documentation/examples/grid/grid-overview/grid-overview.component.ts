import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridItem } from 'ngx-os';

@Component({
    selector: 'demo-grid-overview',
    templateUrl: './grid-overview.component.html',
    styleUrls: ['./grid-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridOverviewComponent {
    public items: GridItem[] = [
        {
            label: 'Item 1',
            iconUrl: '/assets/icons/folder-opened.png'
        },
        {
            label: 'Item 2',
            iconUrl: '/assets/icons/folder-opened.png'
        },
        {
            label: 'Item 3',
            iconUrl: '/assets/icons/folder-opened.png'
        }
    ];
}
