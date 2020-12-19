import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentDescription, ComponentDescriptionMap, ComponentType, DocComponent, DocService } from '@Doc/features/doc';

@Component({
    selector: 'doc-page-structure',
    templateUrl: './page-structure.component.html',
    styleUrls: ['./page-structure.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageStructureComponent implements OnInit {

    public description: ComponentDescription;
    public components: DocComponent[];

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {
        this.initDescription();
        this.initDocComponents();
    }

    private initDescription(): void {
        const componentType: ComponentType = this.activatedRoute.snapshot.params.componentType;

        this.description = ComponentDescriptionMap.get(componentType);
    }

    private initDocComponents(): void {
        this.components = this.docService.getDocComponentsByNames(this.description.componentNames);
        console.log(this.description);
        console.log(this.components);
    }

}
