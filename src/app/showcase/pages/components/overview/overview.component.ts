import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMetaInfoMap, OsComponentEnum } from '@features/documentation';
import { OsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';
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
        private readonly overviewService: OverviewService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initRouteParamsObserver();
    }

    private initMetaInfo(): void {
        const componentType: OsComponentEnum = this.activatedRoute.snapshot.params.componentType;
        const metaInfo = ComponentMetaInfoMap.get(componentType);

        this.overviewService.applyMetaInfo(metaInfo);
    }

    private initRouteParamsObserver(): void {
        this.activatedRoute.params
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.initMetaInfo());
    }
}
