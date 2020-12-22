import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewComponent extends OsBaseComponent {

    @Input()
    public verticalScrollEnabled: boolean = true;

    @Input()
    public horizontalScrollEnabled: boolean = false;

    constructor () {
        super();
    }

}
