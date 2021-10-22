import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DemoComponentMetaInfo, DevExamplesVisibilityService } from '@features/documentation';
import { MainLayoutComponent, MAIN_LAYOUT } from '@layouts';
import { OsBaseViewComponent } from 'ngx-os';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-examples',
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent extends OsBaseViewComponent implements OnInit {
    public readonly isDevExamplesCheckboxVisible = !environment.production;
    public isDevExamplesVisible: boolean;

    public demoComponents: DemoComponentMetaInfo[];

    constructor(
        @Inject(MAIN_LAYOUT) private readonly mainLayout: MainLayoutComponent,
        private readonly titleService: Title,
        private readonly devExamplesVisibilityService: DevExamplesVisibilityService,
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.isDevExamplesVisible = this.devExamplesVisibilityService.data;

        this.titleService.setTitle(`ngx-os - ${this.overviewService.metaInfo.name} Examples`);
        this.mainLayout.scrollView.scrollTo(0, 0);
        this.initMetaInfoObserver();
    }

    public onToggleDevMode(state: boolean): void {
        this.devExamplesVisibilityService.apply(state);
    }

    private initMetaInfoObserver(): void {
        combineLatest([
            this.overviewService.metaInfo$,
            this.devExamplesVisibilityService.data$
        ])
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(([{ demoComponents }, isDevExamplesVisible]) => {
                this.initShowcaseComponents(demoComponents, isDevExamplesVisible);
                this.changeDetector.detectChanges();
            });
    }

    private initShowcaseComponents(
        demoComponents: DemoComponentMetaInfo[],
        isDevExamplesVisible: boolean
    ): void {
        if (!isDevExamplesVisible) {
            this.demoComponents = demoComponents
                ?.filter((showcaseComponent) => !showcaseComponent.isOnlyForDevEnv);
        } else {
            this.demoComponents = demoComponents;
        }
    }
}
