import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { ComponentDescription, Doc, DOC, DocComponent, DocService } from '@Doc/features/doc';

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

    constructor(
        @Inject(DOC) private readonly doc: Doc,
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {}

}
