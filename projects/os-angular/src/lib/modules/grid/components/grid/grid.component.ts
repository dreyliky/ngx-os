import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { GridView } from '../../types/grid-view.type';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'os-element os-grid',
        '[class]': `styleClass + ' ' + view`,
        '[id]': 'id',
        '[style]': 'style',
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
export class GridComponent extends OsBaseComponent {
    @Input()
    public view: GridView = 'medium-icons';

    constructor() {
        super();
    }
}
