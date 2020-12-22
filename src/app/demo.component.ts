import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LibDocProvider, DemoDocProvider } from '@Features/doc';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibDocProvider, DemoDocProvider
    ]
})
export class DemoComponent {

    constructor() {}

}
