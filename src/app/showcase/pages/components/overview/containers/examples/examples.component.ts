import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    OnInit,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { DemoComponentMetaInfo, DevExamplesVisibilityService } from '@features/documentation';
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
    @ViewChildren('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplates: QueryList<ViewContainerRef>;

    @ViewChildren(ExamplesComponent)
    private set demoBlockComponents(_: ExamplesComponent) {
        this.renderDemoComponents();
    }

    public readonly isDevExamplesCheckboxVisible = !environment.production;
    public isDevExamplesVisible: boolean;

    public demoComponents: DemoComponentMetaInfo[];

    constructor(
        private readonly devExamplesVisibilityService: DevExamplesVisibilityService,
        private readonly overviewService: OverviewService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.isDevExamplesVisible = this.devExamplesVisibilityService.data;

        this.initMetaInfoObserver();
    }

    public onToggleDevMode(state: boolean): void {
        this.devExamplesVisibilityService.apply(state);
    }

    private renderDemoComponents(): void {
        if (this.demoTemplates && this.demoComponents) {
            const showcaseTemplates = this.demoTemplates.toArray();

            showcaseTemplates.forEach((showcaseTemplate) => showcaseTemplate.clear());

            this.demoComponents.forEach(({ component }, componentIndex) => {
                const componentFactory = this.componentFactoryResolver
                    .resolveComponentFactory(component);

                showcaseTemplates[componentIndex]?.createComponent(componentFactory);
            });

            this.changeDetector.detectChanges();
        }
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
