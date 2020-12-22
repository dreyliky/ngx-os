import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { OutsideClick } from 'os-angular/helpers';
import { ListItem } from '../../interfaces/item.interface';

@Component({
    selector: 'os-list-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent extends OsBaseComponent {

    @Input()
    public data: ListItem;

    @Input()
    public isSelected: boolean = false;

    @Output()
    public osClick = new EventEmitter<MouseEvent>();

    @Output()
    public osDblClick = new EventEmitter<MouseEvent>();

    @ViewChild('OsListItem')
    private readonly _osListItemElement: ElementRef<HTMLDivElement>;

    constructor () {
        super();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside (event: MouseEvent): void {
        const isClickOutsideWindow = OutsideClick.checkForElement(this._osListItemElement.nativeElement, event);

        if (isClickOutsideWindow && this.isSelected) {
            this.isSelected = false;
        }
    }

    public onClick (event: MouseEvent): void {
        this.isSelected = true;

        if (this.data.onClick) {
            this.data.onClick(event);
        }

        this.osClick.emit(event);
    }

    public onDblClick (event: MouseEvent): void {
        if (this.data.onDblClick) {
            this.data.onDblClick(event);
        }

        this.osDblClick.emit(event);
    }

}
