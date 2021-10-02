import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { DemoComponentMetaInfo, DevExamplesVisibilityService } from '@features/documentation';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'showcase-examples',
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit, OnDestroy {
    @ViewChildren('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplates: QueryList<ViewContainerRef>;

    @ViewChildren(ExamplesComponent)
    private set demoBlockComponents(_: ExamplesComponent) {
        this.renderDemoComponents();
    }

    public demoComponents: DemoComponentMetaInfo[];

    private untilDestroyed$ = new Subject();

    constructor(
        private readonly devExamplesVisibilityService: DevExamplesVisibilityService,
        private readonly overviewService: OverviewService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initMetaInfoObserver();
    }

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
    }

    private renderDemoComponents(): void {
        if (this.demoTemplates && this.demoComponents) {
            const showcaseTemplates = this.demoTemplates.toArray();

            showcaseTemplates.forEach((showcaseTemplate) => showcaseTemplate.clear());

            this.demoComponents.forEach(({ component }, componentIndex) => {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

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
            .pipe(
                takeUntil(this.untilDestroyed$)
            )
            .subscribe(([{ demoComponents }, isDevExamplesVisible]) => {
                this.initShowcaseComponents(demoComponents, isDevExamplesVisible);
                this.changeDetector.detectChanges();
            });
    }

    private initShowcaseComponents(demoComponents: DemoComponentMetaInfo[], isDevExamplesVisible: boolean): void {
        if (!isDevExamplesVisible) {
            this.demoComponents = demoComponents
                ?.filter((showcaseComponent) => !showcaseComponent.isOnlyForDevEnv);
        } else {
            this.demoComponents = demoComponents;
        }
    }
}
