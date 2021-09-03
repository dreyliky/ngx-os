import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMetaInfoMap, OsComponentEnum } from '@Features/doc';
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
        private readonly hostElementRef: ElementRef<HTMLElement>,
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
