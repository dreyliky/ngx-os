import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentMetaInfo, DocComponent } from '@Doc/features/doc';

@Component({
    selector: 'demo-methods',
    templateUrl: './methods.component.html',
    styleUrls: ['./methods.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnInit {

    @Input()
    public readonly description: ComponentMetaInfo;

    @Input()
    public readonly component: DocComponent;

    public isCollapsed: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
