import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevExamplesVisibilityService } from '@features/documentation';
import { MainLayoutComponent, MAIN_LAYOUT } from '@layouts';
import { KeysOfType } from 'ngx-os';
import { OverviewService } from '../../../overview.service';

interface ListItem {
    name: string;
    iconUrl?: string;
    isHeader?: boolean;
}

interface ApiElement {
    name: string;
    iconUrl: string;
    serviceDataPropName: KeysOfType<OverviewService, { name: string }[]>;
}

@Component({
    selector: 'api-side-bar-plan',
    templateUrl: './side-bar-api-plan.component.html',
    styleUrls: ['./side-bar-api-plan.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarApiPlanComponent implements OnInit {
    public apiPlanItems: ListItem[] = [];
    public routeFragment: string;

    private readonly apiElements: ApiElement[] = [
        {
            name: 'Modules',
            iconUrl: '/assets/showcase/icons/dev/angular.svg',
            serviceDataPropName: 'docModules'
        },
        {
            name: 'Services',
            iconUrl: '/assets/showcase/icons/dev/angular-service.svg',
            serviceDataPropName: 'docServices'
        },
        {
            name: 'Directives',
            iconUrl: '/assets/showcase/icons/dev/angular-directive.svg',
            serviceDataPropName: 'docDirectives'
        },
        {
            name: 'Components',
            iconUrl: '/assets/showcase/icons/dev/angular-component.svg',
            serviceDataPropName: 'docComponents'
        },
        {
            name: 'Classes',
            iconUrl: '/assets/showcase/icons/dev/typescript.svg',
            serviceDataPropName: 'docClasses'
        },
        {
            name: 'Interfaces',
            iconUrl: '/assets/showcase/icons/dev/typescript.svg',
            serviceDataPropName: 'docInterfaces'
        },
        {
            name: 'Enums',
            iconUrl: '/assets/showcase/icons/dev/typescript.svg',
            serviceDataPropName: 'docEnums'
        },
        {
            name: 'Types',
            iconUrl: '/assets/showcase/icons/dev/typescript.svg',
            serviceDataPropName: 'docTypes'
        }
    ];

    constructor(
        @Inject(MAIN_LAYOUT) private mainLayout: MainLayoutComponent,
        private readonly devExamplesVisibilityService: DevExamplesVisibilityService,
        private readonly overviewService: OverviewService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initMetaInfoObserver();
        this.initRouteFragmentObserver();
    }

    public onToggleShowInternalExamplesButtonClick(): void {
        const isDevExamplesVisible = this.devExamplesVisibilityService.data;

        this.devExamplesVisibilityService.apply(!isDevExamplesVisible);
    }

    public onExamplesButtonClick(): void {
        this.mainLayout.scrollView.scrollTo(0, 0);
        this.router.navigate([], { fragment: null });
    }

    public onListItemClick(item: ListItem): void {
        if (!item.isHeader) {
            this.router.navigate([], { fragment: item.name });
        }
    }

    private initMetaInfoObserver(): void {
        this.overviewService.metaInfo$
            .subscribe(() => {
                this.initApiPlanItems();
                this.changeDetector.detectChanges();
            });
    }

    private initRouteFragmentObserver(): void {
        this.activatedRoute.fragment
            .subscribe((fragment) => {
                this.routeFragment = fragment;

                this.changeDetector.detectChanges();
            });
    }

    private initApiPlanItems(): void {
        this.apiPlanItems = this.apiElements
            .map(({ name: elementName, iconUrl, serviceDataPropName }) => (<ListItem[]>[
                {
                    name: elementName,
                    iconUrl,
                    isHeader: true
                },
                ...this.overviewService[serviceDataPropName].map(({ name }) => ({ name }))
            ]))
            .filter((items) => items.length > 1)
            .flat();
    }
}
