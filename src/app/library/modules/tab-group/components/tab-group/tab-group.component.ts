import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TrackByFunction,
    ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OsBaseComponent } from '../../../../core';
import { TabComponent } from '../tab';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    host: {
        'class': 'os-tab-group'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent extends OsBaseComponent implements OnInit, OnDestroy {
    /** Index of the tab which is selected */
    @Input()
    public selectedTabIndex: number = 0;

    /** Fires when the `selectedTabIndex` changed */
    @Output()
    public selectedTabIndexChange: EventEmitter<number> = new EventEmitter();

    /** @internal */
    @ContentChildren(TabComponent)
    public set _tabComponentList(data: QueryList<TabComponent>) {
        this.__tabComponentList = data;

        this.tabsChanged$.next();
        this.initTabSelection();
        this.initTabsSelectionObservers();
    }

    /** @internal */
    public get _tabComponentList(): QueryList<TabComponent> {
        return this.__tabComponentList;
    }

    private __tabComponentList: QueryList<TabComponent>;
    private tabsChanged$ = new Subject();

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.tabsChanged$.complete();
    }

    /** @internal */
    public _trackByFn: TrackByFunction<TabComponent> = (index: number): number => {
        return index;
    };

    private initTabsSelectionObservers(): void {
        this._tabComponentList
            .forEach((component, index) => this.initTabButtonClickObserver(component, index));
    }

    private initTabButtonClickObserver(tabComponent: TabComponent, tabIndex: number): void {
        const changesOrDestroyed$ = merge(this.viewDestroyed$, this.tabsChanged$);

        tabComponent.osTabSelected
            .pipe(takeUntil(changesOrDestroyed$))
            .subscribe(() => {
                this.deselectAllTabs();
                tabComponent.setSelectionState(true);
                this.selectedTabIndexChange.emit(tabIndex);
            });
    }

    private initTabSelection(): void {
        const targetTab = this.__tabComponentList.get(this.selectedTabIndex ?? 0);

        targetTab?.setSelectionState(true);
    }

    private deselectAllTabs(): void {
        this._tabComponentList
            .forEach((tabComponent) => tabComponent.setSelectionState(false));
    }
}
