import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListItem } from 'os-angular';

@Component({
    selector: 'demo-list-overview',
    templateUrl: './list-overview.component.html',
    styleUrls: ['./list-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOverviewComponent implements OnInit {

    public items: ListItem[] = [
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

    constructor() {}

    public ngOnInit(): void {}

}
