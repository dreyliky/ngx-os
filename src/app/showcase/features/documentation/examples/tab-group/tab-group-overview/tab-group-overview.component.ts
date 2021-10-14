import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TabItem {
    id: number;
    title: string;
    content: string;
    isDisabled?: boolean;
}

@Component({
    selector: 'showcase-tab-group-overview',
    templateUrl: './tab-group-overview.component.html',
    styleUrls: ['./tab-group-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupOverviewComponent {
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
            title: 'Tab 3 (disabled)',
            content: 'Tab content 3',
            isDisabled: true
        }
    ];

    public selectedTabIndex: number;
}
