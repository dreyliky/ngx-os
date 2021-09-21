import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { Subscription } from 'rxjs';
import { TabComponent } from '../tab';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent extends OsBaseComponent implements OnInit, OnDestroy, AfterContentInit {
    @ContentChildren(TabComponent)
    public readonly _tabComponentList: QueryList<TabComponent>;

    private readonly tabButtonOnClickSubscriptions: Subscription[] = [];

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-tab-group');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterContentInit(): void {
        this.initTabButtonClickObservers();
    }

    public ngOnDestroy(): void {
        this.tabButtonOnClickSubscriptions
            .forEach((subscription) => subscription.unsubscribe());
    }

    public trackByFn = (_: TabComponent, index: number): number => {
        return index;
    }

    private initTabButtonClickObservers(): void {
        this._tabComponentList.forEach((tabComponent) => {
            const tabEventSubscription = tabComponent.osTabButtonClick
                .subscribe(() => {
                    this.deselectAllTabs();

                    tabComponent.isSelected = true;
                });

            this.tabButtonOnClickSubscriptions.push(tabEventSubscription);
        });
    }

    private deselectAllTabs(): void {
        this._tabComponentList.forEach((tabComponent) => {
            tabComponent.isSelected = false;
        });
    }
}
