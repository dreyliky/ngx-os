import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OsBaseComponent } from 'projects/os-angular/src/lib/core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {

    constructor () {
        super({
            elementName: 'os-title-bar'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
