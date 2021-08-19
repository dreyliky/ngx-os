/* eslint-disable @angular-eslint/no-host-metadata-property */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { OptionSelectedEvent } from '../../interfaces';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        // FIXME: Refactoring (exist os-list-item)
        class: 'os-element os-option',
        '[class.selected]': 'selected',
        '[class]': 'styleClass',
        '[id]': 'id',
        '(click)': 'onListItemClick($event)',
        '(dblclick)': 'osDblclick.emit($event)',
        '(mousedown)': 'osMousedown.emit($event)',
        '(mousemove)': 'osMousemove.emit($event)',
        '(mouseout)': 'osMouseout.emit($event)',
        '(mouseover)': 'osMouseover.emit($event)',
        '(mouseup)': 'osMouseup.emit($event)',
        '(wheel)': 'osWheel.emit($event)'
    }
})
export class OptionComponent<T> extends OsBaseComponent {
    @Input()
    public selected: boolean;

    @Input()
    public value: T;

    @Output()
    public osSelected = new EventEmitter<OptionSelectedEvent<T>>();

    constructor() {
        super();
    }

    public onListItemClick(event: MouseEvent): void {
        this.osClick.emit(event);
        this.osSelected.emit({ event, value: this.value });
    }
}
