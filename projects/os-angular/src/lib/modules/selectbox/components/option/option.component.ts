import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element os-option',
        '[class.selected]': 'selected',
        '[class]': 'styleClass',
        '[id]': 'id',
        '[ngStyle]': 'style',
        '(click)': 'onOptionClick($event)',
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
    public osSelected = new EventEmitter<T>();

    constructor() {
        super();
    }

    public onOptionClick(event: MouseEvent): void {
        this.osClick.emit(event);
        this.osSelected.emit(this.value);
    }

}
