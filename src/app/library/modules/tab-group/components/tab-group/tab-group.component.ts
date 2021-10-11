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
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OsBaseComponent } from '../../../../core';
import { TabComponent } from '../tab';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent extends OsBaseComponent implements OnInit, OnDestroy, AfterContentInit {
    /** @internal */
    @ContentChildren(TabComponent)
    public readonly _tabComponentList: QueryList<TabComponent>;

    private tabButtonSubscriptions: Subscription[] = [];

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-tab-group');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterContentInit(): void {
        this.initTabButtonClickObservers();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.unsubscribeFromTabButtonSubscriptions();
    }

    /** @internal */
    public _trackByFn = (_: TabComponent, index: number): number => {
        return index;
    }

    private initTabButtonClickObservers(): void {
        this.unsubscribeFromTabButtonSubscriptions();

        this.tabButtonSubscriptions = [];

        this._tabComponentList
            .forEach((tabComponent) => this.initTabButtonClickObserver(tabComponent));
    }

    private initTabButtonClickObserver(tabComponent: TabComponent): void {
        const subscription = tabComponent.osTabButtonClick
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.deselectAllTabs();

                tabComponent.isSelected = true;
            });

        this.tabButtonSubscriptions.push(subscription);
    }

    private deselectAllTabs(): void {
        this._tabComponentList
            .forEach((tabComponent) => tabComponent.isSelected = false);
    }

    private unsubscribeFromTabButtonSubscriptions(): void {
        this.tabButtonSubscriptions
            ?.forEach((subscription) => subscription.unsubscribe());
    }
}
