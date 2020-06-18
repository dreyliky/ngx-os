import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends OsBaseComponent implements OnInit {

    @Input()
    public title: string;

    constructor () {
        super({
            elementName: 'os-window'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
