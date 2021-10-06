import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { ComponentMetaInfo, LibraryComponentsSearchService, OsComponentEnum } from '@features/documentation';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { ITreeNode } from 'ngx-os';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponentOverviewRouteEnum as RouteEnum } from '../../enums';
import { SideBarItem } from './side-bar-item.interface';

@Injectable()
export class SideBarItemsService {
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
            label: 'API',
            data: {
                sectionUrl: RouteEnum.Api
            }
        }
    ];

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly router: Router
    ) {
        this.initCurrentRouteByUrl(this.router.url);
        this.initRouteUrlObserver();
        this.initDataObservable();
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

    private initDataObservable(): void {
        this.data$ = this.componentsSearchService.filteredComponents$
            .pipe(
                map((metaInfos) => this.mapMetaInfosToTreeNodes(metaInfos))
            );
    }

    @AutoUnsubscribe()
    private initRouteUrlObserver(): Subscription {
        return this.router.events
            .pipe(
                filter<NavigationEnd>((event) => event instanceof NavigationEnd)
            )
            .subscribe(({ url }) => this.initCurrentRouteByUrl(url));
    }

    private initCurrentRouteByUrl(url: string): void {
        let fragmentIndex = url.indexOf('#');
        fragmentIndex = (fragmentIndex === -1) ? url.length : fragmentIndex;
        this.currentRoute = url.slice(0, fragmentIndex);
    }
}
