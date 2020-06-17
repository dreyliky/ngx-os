import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IdGenerator } from '../../helpers';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends OsBaseComponent implements OnInit {

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
            elementName: 'os-radio-button'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
