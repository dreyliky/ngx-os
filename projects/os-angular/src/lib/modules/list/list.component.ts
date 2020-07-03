import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends OsBaseComponent implements OnInit {

    constructor () {
        super({
            elementName: 'os-list'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
