import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { ComponentMetaInfo, LibraryComponentsSearchService } from '@features/documentation';
import { ITreeNode, ITreeNodeSelectionEvent as Selection } from 'ngx-os';
import { Observable } from 'rxjs';
import { ComponentOverviewRouteEnum as RouteEnum } from '../../enums';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-side-bar-list',
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

    public readonly componentSections: ITreeNode[] = [
        {
            label: 'Documentation',
            data: RouteEnum.Documentation
        },
        {
            label: 'Examples',
            data: RouteEnum.Examples
        },
        {
            label: 'Api',
            data: RouteEnum.Api
        }
    ];

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

    public onComponentNodeSelected({ node }: Selection<ComponentMetaInfo>): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${node.data.type}`);
    }

    public onComponentSectionSelected({ node }: Selection<ComponentMetaInfo>, section: ITreeNode<RouteEnum>): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${node.data.type}/${section}`);
    }
}
