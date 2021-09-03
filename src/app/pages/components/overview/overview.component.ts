import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Inject,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMetaInfoMap, OsComponentEnum } from '@Features/doc';
import { ComponentOverviewLayoutComponent, COMPONENT_OVERVIEW_LAYOUT } from '@Layouts/containers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OverviewService } from './overview.service';

@Component({
    selector: 'demo-component-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OverviewService
    ]
})
export class OverviewComponent implements OnInit, OnDestroy {
    private routeParamsSubscription: Subscription;

    constructor(
        @Inject(COMPONENT_OVERVIEW_LAYOUT) private layoutComponent: ComponentOverviewLayoutComponent,
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.initRouteParamsObserver();
        this.initRouteFragmentObserver();
    }

    public ngOnDestroy(): void {
        this.routeParamsSubscription?.unsubscribe();
    }

    private initMetaInfo(): void {
        const componentType: OsComponentEnum = this.activatedRoute.snapshot.params.componentType;
        const metaInfo = ComponentMetaInfoMap.get(componentType);

        this.overviewService.applyMetaInfo(metaInfo);
    }

    private initRouteParamsObserver(): void {
        this.routeParamsSubscription = this.activatedRoute.params
            .subscribe(() => {
                this.layoutComponent.hostElement.scrollTo(0, 0);
                this.initMetaInfo();
                this.changeDetector.detectChanges();
            });
    }

    private initRouteFragmentObserver(): void {
        this.routeParamsSubscription = this.activatedRoute.fragment
            .pipe(
                filter((fragment) => !!fragment)
            )
            .subscribe((fragment) => {
                const targetElement = document.getElementById(fragment);

                targetElement.scrollIntoView();
            });
    }
}
