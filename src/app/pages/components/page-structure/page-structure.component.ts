import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ComponentFactoryResolver, Type, Injector, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentDescription, ComponentDescriptionMap, ComponentType, DocComponent, DocService } from '@Doc/features/doc';

@Component({
    selector: 'doc-page-structure',
    templateUrl: './page-structure.component.html',
    styleUrls: ['./page-structure.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageStructureComponent implements OnInit, AfterViewInit {

    public description: ComponentDescription;
    public components: DocComponent[];

    @ViewChild('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplate: ViewContainerRef;

    constructor(
        private readonly injector: Injector,
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

        this.description = ComponentDescriptionMap.get(componentType);
    }

    private initDocComponents(): void {
        this.components = this.docService.getLibDocComponentsByNames(this.description.componentNames);
    }

    private initDemoComponent(): void {
        const demoComponentTypeRef: Type<any> = this.getDemoComponentTypeRef();

        if (demoComponentTypeRef) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(demoComponentTypeRef);

            this.demoTemplate.createComponent(componentFactory);
        }
    }

    private getDemoComponentTypeRef(): Type<any> {
        if (this.description.demoComponents) {
            return this.description.demoComponents[0];
        }
    }

}
