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
import { merge, Subject } from 'rxjs';
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
    public set _tabComponentList(data: QueryList<TabComponent>) {
        this.__tabComponentList = data;

        this.tabsChanged$.next();
    }

    /** @internal */
    public get _tabComponentList(): QueryList<TabComponent> {
        return this.__tabComponentList;
    }

    private __tabComponentList: QueryList<TabComponent>;
    private tabsChanged$ = new Subject();

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
        this.tabsChanged$.complete();
    }

    /** @internal */
    public _trackByFn = (_: TabComponent, index: number): number => {
        return index;
    }

    private initTabButtonClickObservers(): void {
        this._tabComponentList
            .forEach((tabComponent) => this.initTabButtonClickObserver(tabComponent));
    }

    private initTabButtonClickObserver(tabComponent: TabComponent): void {
        tabComponent.osTabButtonClick
            .pipe(
                takeUntil(merge(this.viewDestroyed$, this.tabsChanged$))
            )
            .subscribe(() => {
                this.deselectAllTabs();

                tabComponent.isSelected = true;
            });
    }

    private deselectAllTabs(): void {
        this._tabComponentList
            .forEach((tabComponent) => tabComponent.isSelected = false);
    }
}
