import { Component, OnInit, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html'
})
export class ScrollViewComponent extends OsBaseComponent implements OnInit {

    @Input()
    public verticalScrollEnabled: boolean = true;

    @Input()
    public horizontalScrollEnabled: boolean = false;

    constructor () {
        super({
            elementName: 'os-scroll-view'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
