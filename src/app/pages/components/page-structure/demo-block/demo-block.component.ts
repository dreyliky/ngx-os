import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'doc-demo-block',
    templateUrl: './demo-block.component.html',
    styleUrls: ['./demo-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBlockComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
