import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LibDocProvider, DemoDocProvider } from '@Features/doc';

@Component({
    selector: 'doc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibDocProvider, DemoDocProvider
    ]
})
export class AppComponent {

    constructor () {}

}
