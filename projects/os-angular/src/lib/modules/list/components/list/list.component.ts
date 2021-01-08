import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element os-list',
        '[class.selected]': 'selected',
        '[class]': 'styleClass',
        '[id]': 'id',
        '(click)': 'osClick.emit($event)',
        '(dblclick)': 'osDblclick.emit($event)',
        '(mousedown)': 'osMousedown.emit($event)',
        '(mousemove)': 'osMousemove.emit($event)',
        '(mouseout)': 'osMouseout.emit($event)',
        '(mouseover)': 'osMouseover.emit($event)',
        '(mouseup)': 'osMouseup.emit($event)',
        '(wheel)': 'osWheel.emit($event)'
    }
})
export class ListComponent extends OsBaseComponent implements OnInit {

    @Input()
    public scrollViewStyle: object;

    @Input()
    public scrollViewStyleClass: string;

    constructor() {
        super();
    }

    public ngOnInit(): void {}

}
