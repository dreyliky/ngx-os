import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Doc/core/enums';
import { ComponentMetaInfo, ComponentMetaInfoMap } from '@Features/documentation';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'demo-side-bar-list',
    templateUrl: './side-bar-list.component.html',
    styleUrls: ['./side-bar-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarListComponent implements OnInit {
    public metaInfo$: Observable<ComponentMetaInfo>;
    public components$: Observable<ComponentMetaInfo[]>;

    private searchString$ = new BehaviorSubject<string>('');

    constructor(
        private readonly overviewService: OverviewService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;

        this.initComponentsObservable();
    }

    public onSearch(event: KeyboardEvent): void {
        const inputElement = event.target as HTMLInputElement;

        this.searchString$.next(inputElement.value);
    }

    public onComponentOptionSelected(component: ComponentMetaInfo): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${component.type}`);
    }

    private initComponentsObservable(): void {
        this.components$ = this.searchString$
            .pipe(
                map(() => this.filterMetaInfosBySearchString())
            );
    }

    private filterMetaInfosBySearchString(): ComponentMetaInfo[] {
        const components = [...ComponentMetaInfoMap.values()];
        const searchString = this.searchString$
            .getValue()
            .trim()
            .toLowerCase();

        return components
            .filter((metaInfo) => (
                !searchString.length ||
                metaInfo.name.toLowerCase().includes(searchString)
            ));
    }
}
