import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMetaInfo, ComponentMetaInfoMap, ComponentType, DemoComponentMetaInfo, DocComponent, DocService } from '@Doc/features/doc';

@Component({
    selector: 'demo-page-structure',
    templateUrl: './page-structure.component.html',
    styleUrls: ['./page-structure.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageStructureComponent implements OnInit, AfterViewInit {

    public metaInfo: ComponentMetaInfo;
    public components: DocComponent[];

    @ViewChild('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplate: ViewContainerRef;

    constructor(
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
        }
    }

    private getDemoComponentTypeRef(): DemoComponentMetaInfo {
        if (this.metaInfo.demoComponents) {
            return this.metaInfo.demoComponents[0];
        }
    }

}
