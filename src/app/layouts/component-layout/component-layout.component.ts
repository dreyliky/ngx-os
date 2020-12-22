import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-component-layout',
    templateUrl: './component-layout.component.html',
    styleUrls: ['./component-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentLayoutComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
