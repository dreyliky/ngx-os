import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentDescription, DocComponent } from '@Doc/features/doc';

@Component({
    selector: 'demo-methods',
    templateUrl: './methods.component.html',
    styleUrls: ['./methods.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnInit {

    @Input()
    public readonly description: ComponentDescription;

    @Input()
    public readonly component: DocComponent;

    constructor() {}

    public ngOnInit(): void {}

}
