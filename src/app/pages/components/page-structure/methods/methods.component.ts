import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { ComponentDescription, Doc, DOC } from '@Doc/features/doc';

@Component({
    selector: 'doc-methods',
    templateUrl: './methods.component.html',
    styleUrls: ['./methods.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnInit {

    @Input()
    public readonly description: ComponentDescription;

    constructor(
        @Inject(DOC) private readonly doc: Doc
    ) {}

    public ngOnInit(): void {}

}
