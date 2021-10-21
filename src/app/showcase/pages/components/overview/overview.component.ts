import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComponentMetaInfoMap, OsComponentEnum } from '@features/documentation';
import { MainLayoutComponent, MAIN_LAYOUT } from '@layouts';
import { OsBaseViewComponent } from 'ngx-os';
import { filter, map, takeUntil } from 'rxjs/operators';
import { OverviewService } from './overview.service';

@Component({
    selector: 'showcase-component-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OverviewService
    ]
})
export class OverviewComponent extends OsBaseViewComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(MAIN_LAYOUT) private readonly mainLayout: MainLayoutComponent,
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initRouteParamsObserver();
        this.initRouteFragmentObserver();
        this.initNavigationObserver();
    }

    private initMetaInfo(): void {
        const componentType: OsComponentEnum = this.activatedRoute.snapshot.params.componentType;
        const metaInfo = ComponentMetaInfoMap.get(componentType);

        this.overviewService.applyMetaInfo(metaInfo);
    }

    private initNavigationObserver(): void {
        this.router.events
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe(() => this.mainLayout.scrollView.scrollTo(0, 0));
    }

    private initRouteParamsObserver(): void {
        this.activatedRoute.params
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.initMetaInfo();
                this.changeDetector.detectChanges();
            });
    }

    private initRouteFragmentObserver(): void {
        this.activatedRoute.fragment
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter((fragment) => !!fragment),
                map((fragment) => this.document.getElementById(fragment))
            )
            .subscribe((targetElement) => targetElement.scrollIntoView());
    }
}
