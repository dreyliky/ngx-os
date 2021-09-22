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
import { DemoComponentMetaInfo, DevExamplesVisibilityService } from '@Features/documentation';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'demo-examples',
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
            const demoTemplates = this.demoTemplates.toArray();

            this.demoComponents.forEach(({ component }, componentIndex) => {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

                demoTemplates[componentIndex]?.clear();
                demoTemplates[componentIndex]?.createComponent(componentFactory);
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
                this.initDemoComponents(demoComponents, isDevExamplesVisible);
                this.renderDemoComponents();
            });
    }

    private initDemoComponents(demoComponents: DemoComponentMetaInfo[], isDevExamplesVisible: boolean): void {
        if (!isDevExamplesVisible) {
            this.demoComponents = demoComponents
                ?.filter((demoComponent) => !demoComponent.isOnlyForDevEnv);
        } else {
            this.demoComponents = demoComponents;
        }
    }
}
