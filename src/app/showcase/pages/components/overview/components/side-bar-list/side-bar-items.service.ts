import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import {
    ComponentMetaInfo,
    LibraryComponentsSearchService,
    OsComponentEnum,
    OsComponentOverviewSectionEnum as RouteEnum
} from '@features/documentation';
import { TreeNode } from 'ngx-os';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SideBarItem } from './side-bar-item.interface';

@Injectable()
export class SideBarItemsService implements OnDestroy {
    public data$: Observable<TreeNode<SideBarItem>[]>;

    private readonly baseSubSections: TreeNode<SideBarItem>[] = [
        {
            label: 'Examples',
            data: {
                imageUrl: '/assets/showcase/icons/emojis/acid.png',
                sectionUrl: RouteEnum.Examples
            }
        },
        {
            label: 'Theming',
            data: {
                imageUrl: '/assets/showcase/icons/emojis/art.png',
                sectionUrl: RouteEnum.Theming
            }
        },
        {
            label: 'API',
            data: {
                imageUrl: '/assets/showcase/icons/emojis/puzzle.png',
                sectionUrl: RouteEnum.Api
            }
        }
    ];

    private currentRoute: string;
    private destroyed$ = new Subject();

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly router: Router
    ) {
        this.initRouteUrlObserver();
        this.initDataObservable();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private mapMetaInfosToTreeNodes(metaInfos: ComponentMetaInfo[]): TreeNode<SideBarItem>[] {
        return metaInfos.map((metaInfo) => {
            const sectionUrl = `/${AppRouteEnum.Components}/` +
                `${metaInfo.type}/${RouteEnum.Documentation}`;
            const isSectionUrlActive = this.isSectionUrlActive(metaInfo.type);

            return {
                label: metaInfo.name,
                id: `${metaInfo.type}_${RouteEnum.Documentation}`,
                isExpanded: isSectionUrlActive,
                isSelected: (isSectionUrlActive && this.currentRoute === sectionUrl),
                data: { sectionUrl, imageUrl: metaInfo.imageUrl },
                children: this.mapBaseSubSectionsForComponent(metaInfo)
            };
        });
    }

    private mapBaseSubSectionsForComponent(metaInfo: ComponentMetaInfo): TreeNode<SideBarItem>[] {
        return this.baseSubSections
            .filter((section) => !this.isSectionForbidden(section, metaInfo))
            .map((section) => {
                const sectionUrl = `/${AppRouteEnum.Components}/` +
                    `${metaInfo.type}/${section.data?.sectionUrl}`;
                const imageUrl = section.data?.imageUrl;

                return {
                    ...section,
                    id: `${metaInfo.type}_${section.label}_${RouteEnum.Documentation}`,
                    isSelected: (this.currentRoute === sectionUrl),
                    data: { sectionUrl, imageUrl }
                };
            });
    }

    private initDataObservable(): void {
        this.data$ = this.componentsSearchService.filteredComponents$
            .pipe(
                map((metaInfos) => this.mapMetaInfosToTreeNodes(metaInfos))
            );
    }

    private initRouteUrlObserver(): void {
        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => (event instanceof NavigationEnd)),
                takeUntil(this.destroyed$)
            )
            .subscribe(({ url }) => this.initCurrentRouteByUrl(url));
    }

    private initCurrentRouteByUrl(url: string): void {
        let fragmentIndex = url.indexOf('#');
        fragmentIndex = (fragmentIndex === -1) ? url.length : fragmentIndex;
        this.currentRoute = url.slice(0, fragmentIndex);
    }

    private isSectionUrlActive(section: OsComponentEnum): boolean {
        return this.currentRoute
            .split('/')
            .some((routePart) => routePart.startsWith(section));
    }

    private isSectionForbidden(
        section: TreeNode<SideBarItem>,
        metaInfo: ComponentMetaInfo
    ): boolean {
        const sectionUrl = section.data?.sectionUrl as RouteEnum;

        return !!metaInfo.forbiddenOverviewSections?.includes(sectionUrl);
    }
}
