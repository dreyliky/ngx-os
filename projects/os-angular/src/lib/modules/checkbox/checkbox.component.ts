import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends OsBaseComponent implements OnInit {

    @Input()
    public label: string;

    @Input()
    public name: string;

    @Input()
    public checked: boolean;

    @Input()
    public disabled: boolean;

    constructor () {
        super({
            elementName: 'os-checkbox'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
