import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-list-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element os-option',
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
export class ListItemComponent<T> extends OsBaseComponent {

    @Input()
    public selected: boolean;

    @Input()
    public value: T;

    @Output()
    public osSelected = new EventEmitter<T>();

    constructor() {
        super();
    }

    public onListItemClick(event: MouseEvent): void {
        this.osClick.emit(event);
        this.osSelected.emit(this.value);
    }

}
