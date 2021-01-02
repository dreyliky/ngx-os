import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ComponentMetaInfo, ComponentMetaInfoMap,
    ComponentType, DemoComponentMetaInfo, DocComponent, DocService
} from '@Doc/features/doc';
import { Subscription } from 'rxjs';
import { DemoBlockComponent } from './demo-block';

@Component({
    selector: 'demo-component-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit, OnDestroy, AfterViewInit {

    public metaInfo: ComponentMetaInfo;
    public components: DocComponent[];

    @ViewChild('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplate: ViewContainerRef;

    @ViewChild(DemoBlockComponent)
    private set demoBlockComponent(_: DemoBlockComponent) {
        this.initDemoComponent();
    }

    private routeParamsSubscription: Subscription;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {
        this.initPage();
        this.initRouteParamsObserver();
    }

    public ngAfterViewInit(): void {
        this.initDemoComponent();
    }

    public ngOnDestroy(): void {
        this.routeParamsSubscription?.unsubscribe();
    }

    private initDescription(): void {
        const componentType: ComponentType = this.activatedRoute.snapshot.params.componentType;

        this.metaInfo = ComponentMetaInfoMap.get(componentType);
    }

    private initDocComponents(): void {
        this.components = this.docService.getLibDocComponentsByTypes(this.metaInfo.libComponents);
    }

    private initDemoComponent(): void {
        const demoComponentMetaInfo = this.getDemoComponentTypeRef();

        if (this.demoTemplate && demoComponentMetaInfo) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                demoComponentMetaInfo.component
            );

            this.demoTemplate.clear();
            this.demoTemplate.createComponent(componentFactory);
            this.changeDetector.detectChanges();
        }
    }

    private getDemoComponentTypeRef(): DemoComponentMetaInfo {
        if (this.metaInfo.demoComponents) {
            return this.metaInfo.demoComponents[0];
        }
    }

    private initRouteParamsObserver(): void {
        this.routeParamsSubscription = this.activatedRoute.params
            .subscribe(() => {
                this.initPage();
                this.changeDetector.detectChanges();
            });
    }

    private initPage(): void {
        this.initDescription();
        this.initDocComponents();
        this.initDemoComponent();
    }

}
