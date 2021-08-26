import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ComponentMetaInfo, DocComponent, DocService, MethodsClass } from '@Features/doc';

@Component({
    selector: 'demo-methods',
    templateUrl: './methods.component.html',
    styleUrls: ['./methods.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnInit {
    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    @Input()
    public readonly component: DocComponent;

    public methods: MethodsClass[];

    public isCollapsed: boolean = false;

    constructor(
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {
        this.methods = this.docService.getDocComponentActualPublicMethods(this.component);
    }

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
