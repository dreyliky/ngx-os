import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-group-box',
    templateUrl: './group-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent extends OsBaseComponent implements OnInit {

    @Input()
    public label: string;

    constructor () {
        super({
            elementName: 'os-group-box'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
