import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import {
    ComponentMetaInfo,
    LibraryComponentsSearchService,
    OsComponentOverviewSectionEnum as RouteEnum
} from '@features/documentation';
import { ITreeNode } from 'ngx-os';
import { Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { SideBarItem } from './side-bar-item.interface';

@Injectable()
export class SideBarItemsService implements OnDestroy {
    public data$: Observable<ITreeNode<SideBarItem>[]>;

    private readonly baseSubSections: ITreeNode<SideBarItem>[] = [
        {
            label: 'Examples',
            data: {
                imageUrl: '/assets/showcase/icons/dev/examples.png',
                sectionUrl: RouteEnum.Examples
            }
        },
        {
            label: 'Theming',
            data: {
                imageUrl: '/assets/showcase/icons/dev/theming.png',
                sectionUrl: RouteEnum.Theming
            }
        },
        {
            label: 'API',
            data: {
                imageUrl: '/assets/showcase/icons/dev/api.png',
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

    private mapMetaInfosToTreeNodes(metaInfos: ComponentMetaInfo[]): ITreeNode<SideBarItem>[] {
        return metaInfos.map((metaInfo) => {
            const sectionUrl = `/${AppRouteEnum.Components}/${metaInfo.type}/${RouteEnum.Documentation}`;
            const isSectionUrlActive = this.currentRoute.includes(metaInfo.type);

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

    private mapBaseSubSectionsForComponent(metaInfo: ComponentMetaInfo): ITreeNode<SideBarItem>[] {
        return this.baseSubSections
            .filter((section) => !this.isSectionForbidden(section, metaInfo))
            .map((section) => {
                const sectionUrl = `/${AppRouteEnum.Components}/${metaInfo.type}/${section.data.sectionUrl}`;
                const imageUrl = section.data.imageUrl;

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
                takeUntil(this.destroyed$),
                startWith(this.router.url),
                filter<NavigationEnd>((event) => event instanceof NavigationEnd)
            )
            .subscribe(({ url }) => this.initCurrentRouteByUrl(url));
    }

    private initCurrentRouteByUrl(url: string): void {
        let fragmentIndex = url.indexOf('#');
        fragmentIndex = (fragmentIndex === -1) ? url.length : fragmentIndex;
        this.currentRoute = url.slice(0, fragmentIndex);
    }

    private isSectionForbidden(section: ITreeNode<SideBarItem>, metaInfo: ComponentMetaInfo): boolean {
        const sectionUrl = section.data.sectionUrl as RouteEnum;

        return metaInfo.forbiddenOverviewSections?.includes(sectionUrl);
    }
}
