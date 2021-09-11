import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainLayoutComponent, MAIN_LAYOUT } from '@Layouts';
import { OverviewService } from '../overview.service';

interface ApiPlanItem {
    iconUrl: string;
    name: string;
}

@Component({
    selector: 'demo-side-bar-api-plan',
    templateUrl: './side-bar-api-plan.component.html',
    styleUrls: ['./side-bar-api-plan.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarApiPlanComponent implements OnInit {
    public apiPlanItems: ApiPlanItem[] = [];
    public routeFragment: string;

    constructor(
        @Inject(MAIN_LAYOUT) private layoutComponent: MainLayoutComponent,
        private readonly overviewService: OverviewService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initMetaInfoObserver();
        this.initRouteFragmentObserver();
    }

    public onScrollTopButtonClick(): void {
        this.layoutComponent.scrollToTop();
        this.router.navigate([], { fragment: null });
    }

    public onApiPlanItemSelected(apiPlanItem: ApiPlanItem): void {
        this.router.navigate([], { fragment: apiPlanItem.name });
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
            ...this.docModulesToApiPlanItems(),
            ...this.docServicesToApiPlanItems(),
            ...this.docDirectivesToApiPlanItems(),
            ...this.docComponentsToApiPlanItems(),
            ...this.docInterfacesToApiPlanItems(),
            ...this.docEnumsToApiPlanItems(),
            ...this.docTypesToApiPlanItems()
        ];
    }

    private docModulesToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docModules.map((docModule) => ({
            iconUrl: '/assets/icons/dev/angular.svg',
            name: docModule.name
        }));
    }

    private docServicesToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docServices.map((docService) => ({
            iconUrl: '/assets/icons/dev/angular-service.svg',
            name: docService.name
        }));
    }

    private docDirectivesToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docDirectives.map((docDirective) => ({
            iconUrl: '/assets/icons/dev/angular-directive.svg',
            name: docDirective.name
        }));
    }

    private docComponentsToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docComponents.map((docComponent) => ({
            iconUrl: '/assets/icons/dev/angular-component.svg',
            name: docComponent.name
        }));
    }

    private docInterfacesToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docInterfaces.map((docInterface) => ({
            iconUrl: '/assets/icons/dev/typescript.svg',
            name: docInterface.name
        }));
    }

    private docEnumsToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docEnums.map((docEnum) => ({
            iconUrl: '/assets/icons/dev/typescript.svg',
            name: docEnum.name
        }));
    }

    private docTypesToApiPlanItems(): ApiPlanItem[] {
        return this.overviewService.docTypes.map((docType) => ({
            iconUrl: '/assets/icons/dev/typescript.svg',
            name: docType.name
        }));
    }
}
