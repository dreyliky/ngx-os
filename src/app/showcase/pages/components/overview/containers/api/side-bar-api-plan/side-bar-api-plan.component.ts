import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevExamplesVisibilityService } from '@features/documentation';
import { MainLayoutComponent, MAIN_LAYOUT } from '@layouts';
import { environment } from 'src/environments/environment';
import { OverviewService } from '../../../overview.service';

interface ListItem {
    iconUrl: string;
    name: string;
    isHidden?: boolean;
    onClick?: () => void;
}

@Component({
    selector: 'showcase-side-bar-api-plan',
    templateUrl: './side-bar-api-plan.component.html',
    styleUrls: ['./side-bar-api-plan.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarApiPlanComponent implements OnInit {
    public apiPlanItems: ListItem[] = [];
    public routeFragment: string;

    private readonly customItems: ListItem[] = [
        {
            name: 'DEV: Toggle internal examples',
            iconUrl: '/assets/showcase/icons/dev/powershell.svg',
            isHidden: environment.production,
            onClick: () => this.onToggleShowInternalExamplesButtonClick()
        },
        {
            name: 'Examples',
            iconUrl: '/assets/showcase/icons/dev/examples.svg',
            onClick: () => this.onExamplesButtonClick()
        }
    ];

    constructor(
        @Inject(MAIN_LAYOUT) private layoutComponent: MainLayoutComponent,
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
        this.layoutComponent.scrollToTop();
        this.router.navigate([], { fragment: null });
    }

    public onListItemClick(item: ListItem): void {
        if (item.onClick) {
            item.onClick();
        } else {
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
        this.apiPlanItems = [
            ...this.customItems,
            ...this.docModulesToApiPlanItems(),
            ...this.docServicesToApiPlanItems(),
            ...this.docDirectivesToApiPlanItems(),
            ...this.docComponentsToApiPlanItems(),
            ...this.docClassesToApiPlanItems(),
            ...this.docInterfacesToApiPlanItems(),
            ...this.docEnumsToApiPlanItems(),
            ...this.docTypesToApiPlanItems()
        ];
    }

    private docModulesToApiPlanItems(): ListItem[] {
        return this.overviewService.docModules.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/angular.svg'
        }));
    }

    private docServicesToApiPlanItems(): ListItem[] {
        return this.overviewService.docServices.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/angular-service.svg'
        }));
    }

    private docDirectivesToApiPlanItems(): ListItem[] {
        return this.overviewService.docDirectives.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/angular-directive.svg'
        }));
    }

    private docComponentsToApiPlanItems(): ListItem[] {
        return this.overviewService.docComponents.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/angular-component.svg'
        }));
    }

    private docClassesToApiPlanItems(): ListItem[] {
        return this.overviewService.docClasses.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/typescript.svg'
        }));
    }

    private docInterfacesToApiPlanItems(): ListItem[] {
        return this.overviewService.docInterfaces.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/typescript.svg'
        }));
    }

    private docEnumsToApiPlanItems(): ListItem[] {
        return this.overviewService.docEnums.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/typescript.svg'
        }));
    }

    private docTypesToApiPlanItems(): ListItem[] {
        return this.overviewService.docTypes.map(({ name }) => ({
            name,
            iconUrl: '/assets/showcase/icons/dev/typescript.svg'
        }));
    }
}
