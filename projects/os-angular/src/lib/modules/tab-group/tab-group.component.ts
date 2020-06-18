import { Component, OnInit, ChangeDetectionStrategy, QueryList, ContentChildren, AfterContentInit, OnDestroy } from '@angular/core';
import { TabComponent } from './components';
import { Subscription } from 'rxjs';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements OnInit, OnDestroy, AfterContentInit {

    @ContentChildren(TabComponent)
    public readonly tabComponentList: QueryList<TabComponent>;

    private readonly tabButtonOnClickSubscriptions: Subscription[] = [];

    constructor () {}

    public ngOnInit (): void {}

    public ngOnDestroy (): void {
        this.tabButtonOnClickSubscriptions
            .forEach((subscription) => subscription.unsubscribe());
    }

    public ngAfterContentInit (): void {
        this.tabComponentList.forEach((tabComponent) => {
            const tabEventSubscription = tabComponent.OnTabButtonClick
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

    private deselectAllTabs (): void {
        this.tabComponentList.forEach((tabComponent) => {
            tabComponent.selected = false;
        });
    }

}
