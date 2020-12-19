import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentDescription, DocComponent } from '@Doc/features/doc';

@Component({
    selector: 'doc-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnInit {

    @Input()
    public readonly description: ComponentDescription;

    @Input()
    public readonly component: DocComponent;

    public components: DocComponent[];

    constructor() {}

    public ngOnInit(): void {}

}
