import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import {
    ComponentMetaInfo,
    LibraryComponentsSearchService,
    OsComponentEnum,
    OsComponentOverviewSectionEnum as RouteEnum
} from '@features/documentation';
import { injectLocal } from 'ngx-local-injector';
import { ɵDestroyService } from 'ngx-os/core';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SideBarItem } from './side-bar-item.interface';

// FIXME: Refactor
@Injectable()
export class SideBarItemsService {
    public data$: Observable<SideBarItem[]>;

    private readonly baseSubSections: SideBarItem[] = [
        {
            label: 'Examples',
            sectionUrl: RouteEnum.Examples
        },
        {
            label: 'Theming',
            sectionUrl: RouteEnum.Theming
        },
        {
            label: 'API',
            sectionUrl: RouteEnum.Api
        }
    ];

    private readonly destroyed$ = injectLocal(ɵDestroyService);

    private currentRoute: string;

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly router: Router
    ) {
        this.initCurrentRouteByUrl(this.router.url);
        this.initRouteUrlObserver();
        this.initDataObservable();
    }

    private mapMetaInfosToTreeNodes(metaInfos: ComponentMetaInfo[]): SideBarItem[] {
        return metaInfos.map((metaInfo) => {
            const sectionUrl = `/${AppRouteEnum.Components}/` +
                `${metaInfo.type}/${RouteEnum.Documentation}`;
            const isSectionUrlActive = this.isSectionUrlActive(metaInfo.type);

            return {
                sectionUrl,
                label: metaInfo.name,
                id: `${metaInfo.type}_${RouteEnum.Documentation}`,
                isExpandedByDefault: isSectionUrlActive,
                isSelectedByDefault: (isSectionUrlActive && this.currentRoute === sectionUrl),
                imageUrl: metaInfo.imageUrl,
                children: this.mapBaseSubSectionsForComponent(metaInfo)
            };
        });
    }

    private mapBaseSubSectionsForComponent(metaInfo: ComponentMetaInfo): SideBarItem[] {
        return this.baseSubSections
            .filter((section) => !this.isSectionForbidden(section, metaInfo))
            .map((section: SideBarItem) => {
                const sectionUrl = `/${AppRouteEnum.Components}/` +
                    `${metaInfo.type}/${section?.sectionUrl}`;

                return <SideBarItem>{
                    ...section,
                    id: `${metaInfo.type}_${section.label}_${RouteEnum.Documentation}`,
                    isSelectedByDefault: (this.currentRoute === sectionUrl),
                    sectionUrl
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
        section: SideBarItem,
        metaInfo: ComponentMetaInfo
    ): boolean {
        const sectionUrl = section?.sectionUrl as RouteEnum;

        return !!metaInfo.forbiddenOverviewSections?.includes(sectionUrl);
    }
}
