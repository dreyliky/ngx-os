import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Coordinate } from 'ngx-os';

interface Shortcut {
    readonly iconUrl: string;
    readonly label: string;
    readonly coordinate?: Coordinate;
}

@Component({
    selector: 'showcase-selection-overview',
    templateUrl: './selection-overview.component.html',
    styleUrls: ['./selection-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionOverviewComponent {
    public selectedShortcuts = [];

    public shortcuts: Shortcut[] = [
        {
            iconUrl: '/assets/showcase/icons/components/button.png',
            label: 'Button module',
            coordinate: { x: 1, y: 0 }
        },
        {
            iconUrl: '/assets/showcase/icons/components/window.png',
            label: 'Window module',
            coordinate: { x: 3, y: 1 }
        },
        {
            iconUrl: '/assets/showcase/icons/components/selection.png',
            label: 'Selection module'
        }
    ];

    public onItemsSelection(selectedShortcuts: Shortcut[]): void {
        this.selectedShortcuts = selectedShortcuts;
    }
}
