import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ComponentMetaInfo, ComponentMetaInfoMap,
    ComponentType, DemoComponentMetaInfo, DocComponent, DocService
} from '@Doc/features/doc';

@Component({
    selector: 'demo-component-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit, AfterViewInit {

    public metaInfo: ComponentMetaInfo;
    public components: DocComponent[];

    @ViewChild('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplate: ViewContainerRef;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {
        this.initDescription();
        this.initDocComponents();
    }

    public ngAfterViewInit(): void {
        this.initDemoComponent();
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

        if (demoComponentMetaInfo) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                demoComponentMetaInfo.component
            );

            this.demoTemplate.createComponent(componentFactory);
            this.changeDetector.detectChanges();
        }
    }

    private getDemoComponentTypeRef(): DemoComponentMetaInfo {
        if (this.metaInfo.demoComponents) {
            return this.metaInfo.demoComponents[0];
        }
    }

}
