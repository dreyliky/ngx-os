import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Doc, DOC } from '@Doc/features/doc';

@Component({
    selector: 'doc-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

    constructor(
        @Inject(DOC) private readonly doc: Doc
    ) {}

    public ngOnInit(): void {
        console.log(this.doc);
    }

}
