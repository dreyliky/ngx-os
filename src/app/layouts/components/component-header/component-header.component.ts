import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationRouteEnum } from '@Doc/core/enums';

@Component({
    selector: 'demo-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent implements OnInit {

    public routeEnum = DocumentationRouteEnum;

    constructor() {}

    public ngOnInit(): void {}

}
