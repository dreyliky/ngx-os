import {
    AfterContentInit, ChangeDetectionStrategy,
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
    public readonly tabComponentList: QueryList<TabComponent>;

    private readonly tabButtonOnClickSubscriptions: Subscription[] = [];

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
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

    public ngOnDestroy(): void {
        this.tabButtonOnClickSubscriptions
            .forEach((subscription) => subscription.unsubscribe());
    }

    public trackByFn = (_: TabComponent, index: number): number => {
        return index;
    }

    private deselectAllTabs(): void {
        this.tabComponentList.forEach((tabComponent) => {
            tabComponent.selected = false;
        });
    }
}
