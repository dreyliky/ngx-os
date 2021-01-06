import { Component } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-text',
    templateUrl: './text.component.html',
    host: {
        'class': 'os-element',
        '[style]': 'style',
        '[class]': 'styleClass',
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
export class TextComponent extends OsBaseComponent {

    constructor() {
        super();
    }

}
