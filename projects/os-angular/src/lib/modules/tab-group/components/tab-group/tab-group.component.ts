import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    OnDestroy,
    QueryList
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { Subscription } from 'rxjs';
import { TabComponent } from '../tab';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent extends OsBaseComponent implements OnDestroy, AfterContentInit {
    @ContentChildren(TabComponent)
    public readonly tabComponentList: QueryList<TabComponent>;

    private readonly tabButtonOnClickSubscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
        this.tabButtonOnClickSubscriptions
            .forEach((subscription) => subscription.unsubscribe());
    }

    public ngAfterContentInit(): void {
        this.tabComponentList.forEach((tabComponent) => {
            const tabEventSubscription = tabComponent.osTabButtonClick
                .subscribe(() => {
                    this.deselectAllTabs();

                    tabComponent.selected = true;
                });

            this.tabButtonOnClickSubscriptions.push(tabEventSubscription as any);
        });
    }

    public trackByFn = (tabComponent: TabComponent, index: number): number => {
        return index;
    }

    private deselectAllTabs(): void {
        this.tabComponentList.forEach((tabComponent) => {
            tabComponent.selected = false;
        });
    }
}
