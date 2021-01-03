import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element',
        '[class]': `styleClass + ' os-header-' + size`,
        '[style]': 'style',
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
export class HeaderComponent extends OsBaseComponent {

    @Input()
    public set size(value: number) {
        this.validateSize(value);

        this._size = this.getValidSize(value);
    }

    public get size(): number {
        return this._size;
    }

    private _size: number = 1;

    constructor() {
        super();
    }

    private getValidSize(value: number): number {
        if (value < 1 || typeof(value) !== 'number') {
            return 1;
        } else if (value > 6) {
            return 6;
        }

        return value;
    }

    private validateSize(value: number): void {
        if (typeof(value) !== 'number') {
            console.warn('os-header size param must be a number!');
        }

        if (value < 1 || value > 6) {
            console.warn('os-header size param can\'t be less than 1 and more than 6!');
        }
    }

}
