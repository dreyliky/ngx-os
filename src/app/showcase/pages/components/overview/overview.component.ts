import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ComponentMetaInfo, ComponentMetaInfoMap, OsComponentEnum } from '@features/documentation';
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
    private targetComponentMetaInfo: ComponentMetaInfo;

    constructor(
        @Inject(MAIN_LAYOUT) private readonly mainLayout: MainLayoutComponent,
        private readonly titleService: Title,
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initRouteParamsObserver();
        this.initRouteFragmentObserver();
    }

    private initMetaInfo(): void {
        const componentType: OsComponentEnum = this.activatedRoute.snapshot.params.componentType;
        this.targetComponentMetaInfo = ComponentMetaInfoMap.get(componentType);

        this.overviewService.applyMetaInfo(this.targetComponentMetaInfo);
    }

    private initRouteParamsObserver(): void {
        this.activatedRoute.params
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.mainLayout.scrollView.scrollTo(0, 0);
                this.initMetaInfo();
                this.titleService.setTitle(`ngx-os - ${this.targetComponentMetaInfo.name} Documentation`);
                this.changeDetector.detectChanges();
            });
    }

    private initRouteFragmentObserver(): void {
        this.activatedRoute.fragment
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter((fragment) => !!fragment),
                map((fragment) => document.getElementById(fragment))
            )
            .subscribe((targetElement) => targetElement.scrollIntoView());
    }
}
