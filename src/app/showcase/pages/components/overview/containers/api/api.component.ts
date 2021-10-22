import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainLayoutComponent, MAIN_LAYOUT } from '@layouts/containers';
import { OsBaseViewComponent } from 'ngx-os';
import { filter, map, takeUntil } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent extends OsBaseViewComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(MAIN_LAYOUT) private readonly mainLayout: MainLayoutComponent,
        private readonly titleService: Title,
        private readonly overviewService: OverviewService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.titleService.setTitle(`ngx-os - ${this.overviewService.metaInfo.name} API`);
        this.mainLayout.scrollView.scrollTo(0, 0);
        this.initRouteFragmentObserver();
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
