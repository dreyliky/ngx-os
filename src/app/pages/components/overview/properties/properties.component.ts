import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentMetaInfo, DocComponent } from '@Doc/features/doc';

@Component({
    selector: 'demo-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnInit {

    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    @Input()
    public readonly component: DocComponent;

    public isCollapsed: boolean = false;

    public components: DocComponent[];

    constructor() {}

    public ngOnInit(): void {}

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
