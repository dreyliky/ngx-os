import { Component, OnInit, ChangeDetectionStrategy, QueryList, ContentChildren, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OsBaseComponent } from 'os-angular/core';
import { TabComponent } from '../tab';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent extends OsBaseComponent implements OnInit, OnDestroy, AfterContentInit {

    @ContentChildren(TabComponent)
    public readonly tabComponentList: QueryList<TabComponent>;

    private readonly tabButtonOnClickSubscriptions: Subscription[] = [];

    constructor () {
        super({
            elementName: 'os-tab-group'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

    public ngOnDestroy (): void {
        this.tabButtonOnClickSubscriptions
            .forEach((subscription) => subscription.unsubscribe());
    }

    public ngAfterContentInit (): void {
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

    private deselectAllTabs (): void {
        this.tabComponentList.forEach((tabComponent) => {
            tabComponent.selected = false;
        });
    }

}
