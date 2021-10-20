import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Coordinate, GridDirectionEnum } from 'ngx-os';

interface MyGridItem {
    coordinate?: Coordinate;
    label: string;
    iconUrl: string;
}

@Component({
    selector: 'showcase-grid-item-with-static-coordinate',
    templateUrl: './grid-item-with-static-coordinate.component.html',
    styleUrls: ['./grid-item-with-static-coordinate.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemWithStaticCoordinateComponent {
    public readonly gridDirectionEnum = GridDirectionEnum;

    public readonly items: MyGridItem[] = [
        {
            coordinate: { x: 1, y: 0 },
            label: 'Static item #1',
            iconUrl: '/assets/showcase/icons/icon.png'
        },
        {
            label: 'Item #1',
            iconUrl: '/assets/showcase/icons/folder-opened.png'
        },
        {
            label: 'Item #2',
            iconUrl: '/assets/showcase/icons/folder-opened.png'
        },
        {
            label: 'Item #3',
            iconUrl: '/assets/showcase/icons/folder-opened.png'
        },
        {
            label: 'Item #4',
            iconUrl: '/assets/showcase/icons/folder-opened.png'
        },
        {
            label: 'Item #5',
            iconUrl: '/assets/showcase/icons/folder-opened.png'
        },
        {
            coordinate: { x: 3, y: 0 },
            label: 'Static item #2',
            iconUrl: '/assets/showcase/icons/icon.png'
        },
        {
            coordinate: { x: 0, y: 1 },
            label: 'Static item #3',
            iconUrl: '/assets/showcase/icons/icon.png'
        }
    ];

    public currentGridDirection = GridDirectionEnum.Horizontal;
}
