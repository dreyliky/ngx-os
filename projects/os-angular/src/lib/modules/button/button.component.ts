import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OsBaseButtonComponent } from '../../core';
import { buttonType } from './shared';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends OsBaseButtonComponent implements OnInit {

    @Input()
    public type: buttonType;

    @Output()
    public OnFocus: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public OnBlur: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {
        super();
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
