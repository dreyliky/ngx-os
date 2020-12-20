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
    public readonly description: ComponentMetaInfo;

    @Input()
    public readonly component: DocComponent;

    public components: DocComponent[];

    constructor() {}

    public ngOnInit(): void {}

}
