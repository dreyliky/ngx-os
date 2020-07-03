import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { OutsideClick } from 'os-angular/helpers';
import { ListItem } from '../../interfaces/item.interface';

@Component({
    selector: 'os-list-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent extends OsBaseComponent implements OnInit {

    @Input()
    public data: ListItem;

    @Input()
    public isSelected: boolean = false;

    @Output()
    public OnClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnDblClick = new EventEmitter<MouseEvent>();

    @ViewChild('OsListItem')
    private readonly _osListItemElement: ElementRef<HTMLDivElement>;

    constructor () {
        super({
            elementName: 'os-list-item'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
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

        this.OnClick.emit(event);
    }

    public onDblClick (event: MouseEvent): void {
        if (this.data.onDblClick) {
            this.data.onDblClick(event);
        }

        this.OnDblClick.emit(event);
    }

}
