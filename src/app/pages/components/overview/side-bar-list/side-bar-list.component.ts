import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Doc/core/enums';
import { ComponentMetaInfo, LibraryComponentsSearchService } from '@Features/documentation';
import { Observable } from 'rxjs';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'demo-side-bar-list',
    templateUrl: './side-bar-list.component.html',
    styleUrls: ['./side-bar-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibraryComponentsSearchService
    ]
})
export class SideBarListComponent implements OnInit {
    public metaInfo$: Observable<ComponentMetaInfo>;
    public filteredComponents$: Observable<ComponentMetaInfo[]>;

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly overviewService: OverviewService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;
        this.filteredComponents$ = this.componentsSearchService.filteredComponents$;
    }

    public onSearch(event: KeyboardEvent): void {
        const inputElement = event.target as HTMLInputElement;

        this.componentsSearchService.search(inputElement.value);
    }

    public onComponentOptionSelected(component: ComponentMetaInfo): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${component.type}`);
    }
}
