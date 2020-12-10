import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OsBaseButtonComponent } from 'os-angular/core';
import { buttonType } from '../../shared';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends OsBaseButtonComponent implements OnInit {

    @Input()
    public type: buttonType = 'button';

    constructor () {
        super();
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
