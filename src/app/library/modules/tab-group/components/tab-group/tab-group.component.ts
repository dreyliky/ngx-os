import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    OnInit,
    QueryList
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { OsBaseComponent } from '../../../../core';
import { TabComponent } from '../tab';

@Component({
    selector: 'os-tab-group',
    templateUrl: './tab-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent extends OsBaseComponent implements OnInit, AfterContentInit {
    /** @internal */
    @ContentChildren(TabComponent)
    public readonly _tabComponentList: QueryList<TabComponent>;

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

    /** @internal */
    public trackByFn = (_: TabComponent, index: number): number => {
        return index;
    }

    private initTabButtonClickObservers(): void {
        this._tabComponentList
            .forEach((tabComponent) => this.initTabButtonClickObserver(tabComponent));
    }

    @AutoUnsubscribe()
    private initTabButtonClickObserver(tabComponent: TabComponent): Subscription {
        return tabComponent.osTabButtonClick
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
