import {
    ChangeDetectionStrategy, Component, ElementRef,
    EventEmitter, HostListener, Input, Output
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { OutsideClick } from 'os-angular/helpers';
import { GridItem } from '../../interfaces/item.interface';

@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element os-grid-item',
        '[class]': 'styleClass',
        '[id]': 'id',
        '[style]': 'style',
        '[class.selected]': 'isSelected',
        '(click)': 'onClick($event)',
        '(dblclick)': 'onDblClick($event)',
        '(mousedown)': 'onMouseDown($event)',
        '(mousemove)': 'osMousemove.emit($event)',
        '(mouseout)': 'osMouseout.emit($event)',
        '(mouseover)': 'osMouseover.emit($event)',
        '(mouseup)': 'osMouseup.emit($event)',
        '(wheel)': 'osWheel.emit($event)'
    }
})
export class GridItemComponent extends OsBaseComponent {

    @Input()
    public data: GridItem;

    @Input()
    public isSelected: boolean = false;

    @Output()
    public osClick = new EventEmitter<MouseEvent>();

    @Output()
    public osDblClick = new EventEmitter<MouseEvent>();

    constructor(
        private readonly hostElement: ElementRef
    ) {
        super();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const gridItemElem = this.hostElement.nativeElement;
        const isClickOutsideWindow = OutsideClick.checkForElement(gridItemElem, event);

        if (isClickOutsideWindow && this.isSelected) {
            this.isSelected = false;
        }
    }

    public onMouseDown(event: MouseEvent): void {
        this.isSelected = true;

        this.osMousedown.emit(event);
    }

    public onClick(event: MouseEvent): void {
        if (this.data.onClick) {
            this.data.onClick(event);
        }

        this.osClick.emit(event);
    }

    public onDblClick(event: MouseEvent): void {
        if (this.data.onDblClick) {
            this.data.onDblClick(event);
        }

        this.osDblClick.emit(event);
    }

}
