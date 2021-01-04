import {
    ChangeDetectionStrategy, Component, ElementRef,
    EventEmitter, HostListener, Input, Output, ViewChild
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { OutsideClick } from 'os-angular/helpers';
import { GridItem } from '../../interfaces/item.interface';

@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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

    @ViewChild('OsGridItem')
    private readonly _osGridItemElement: ElementRef<HTMLDivElement>;

    constructor() {
        super();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const gridItemElem = this._osGridItemElement.nativeElement;
        const isClickOutsideWindow = OutsideClick.checkForElement(gridItemElem, event);

        if (isClickOutsideWindow && this.isSelected) {
            this.isSelected = false;
        }
    }

    public onClick(event: MouseEvent): void {
        this.isSelected = true;

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
