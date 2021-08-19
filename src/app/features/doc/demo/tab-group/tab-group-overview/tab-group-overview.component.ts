import { ChangeDetectionStrategy, Component } from '@angular/core';

enum TabEnum {
    Tab1,
    Tab2,
    Tab3
}

@Component({
    selector: 'demo-tab-group-overview',
    templateUrl: './tab-group-overview.component.html',
    styleUrls: ['./tab-group-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupOverviewComponent {
    public readonly tabEnum: typeof TabEnum = TabEnum;

    public selectedTab: TabEnum = TabEnum.Tab2;
}
