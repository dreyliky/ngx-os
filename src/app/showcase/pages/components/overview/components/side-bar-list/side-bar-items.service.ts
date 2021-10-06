import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { ComponentMetaInfo, LibraryComponentsSearchService, OsComponentEnum } from '@features/documentation';
import { ITreeNode } from 'ngx-os';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponentOverviewRouteEnum as RouteEnum } from '../../enums';
import { SideBarItem } from './side-bar-item.interface';

@Injectable()
export class SideBarItemsService implements OnDestroy {
    public data$: Observable<ITreeNode<SideBarItem>[]>;

    private currentRoute: string;

    private readonly baseSubSections: ITreeNode<SideBarItem>[] = [
        {
            label: 'Examples',
            data: {
                sectionUrl: RouteEnum.Examples
            }
        },
        {
            label: 'Api',
            data: {
                sectionUrl: RouteEnum.Api
            }
        }
    ];

    private routerEventsSubscription: Subscription;

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.initRouteUrlObserver();
        this.initItems();
    }

    public ngOnDestroy(): void {
        this.routerEventsSubscription.unsubscribe();
    }

    private initItems(): void {
        this.data$ = this.componentsSearchService.filteredComponents$
            .pipe(
                map((metaInfos) => this.mapMetaInfosToTreeNodes(metaInfos))
            );
    }

    private mapMetaInfosToTreeNodes(metaInfos: ComponentMetaInfo[]): ITreeNode<SideBarItem>[] {
        return metaInfos.map(({ name, type, imageUrl }) => {
            const sectionUrl = `/${AppRouteEnum.Components}/${type}/${RouteEnum.Documentation}`;
            const isSectionUrlActive = this.currentRoute.includes(type);

            return {
                label: name,
                id: `${type}_${RouteEnum.Documentation}`,
                isExpanded: isSectionUrlActive,
                isSelected: (isSectionUrlActive && this.currentRoute === sectionUrl),
                data: { sectionUrl, imageUrl },
                children: this.mapBaseSubSectionsForComponent(type)
            };
        });
    }

    private mapBaseSubSectionsForComponent(component: OsComponentEnum): ITreeNode<SideBarItem>[] {
        return this.baseSubSections.map((section) => {
            const sectionUrl = `/${AppRouteEnum.Components}/${component}/${section.data.sectionUrl}`;

            return {
                ...section,
                id: `${component}_${section.label}_${RouteEnum.Documentation}`,
                isSelected: (this.currentRoute === sectionUrl),
                data: { sectionUrl }
            };
        });
    }

    private initRouteUrlObserver(): void {
        this.routerEventsSubscription = this.router.events
            .pipe(
                filter<NavigationEnd>((event) => event instanceof NavigationEnd)
            )
            .subscribe(({ url }) => {
                let fragmentIndex = url.indexOf('#');
                fragmentIndex = (fragmentIndex === -1) ? url.length : fragmentIndex;
                this.currentRoute = url.slice(0, fragmentIndex);
            });
    }
}
