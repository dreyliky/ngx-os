import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface TabItem {
    id: number;
    title: string;
    content: string;
}

@Component({
    selector: 'demo-tab-group-overview',
    templateUrl: './tab-group-overview.component.html',
    styleUrls: ['./tab-group-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupOverviewComponent implements OnInit {
    public readonly tabs: TabItem[] = [
        {
            id: 1,
            title: 'Tab 1',
            content: 'Tab content 1'
        },
        {
            id: 2,
            title: 'Tab 2',
            content: 'Tab content 2'
        },
        {
            id: 3,
            title: 'Tab 3',
            content: 'Tab content 3'
        }
    ];

    public selectedTabId: number;

    public ngOnInit(): void {
        this.selectedTabId = this.tabs[0].id;
    }
}
