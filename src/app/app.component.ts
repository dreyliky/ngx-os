import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocProvider } from '@Features/doc';

@Component({
    selector: 'doc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DocProvider
    ]
})
export class AppComponent {

    constructor () {}

}
