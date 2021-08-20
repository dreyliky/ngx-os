import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import { OsBaseComponent } from '@core';
import { OutsideClick } from '@helpers';
import { GridItem } from '../../interfaces';

@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent extends OsBaseComponent implements OnInit {
    @Input()
    public data: GridItem;

    @Input()
    public set selected(selected: boolean) {
        this._selected = selected;

        this.hostClasslistManager.applyAsFlag('selected', selected);
    }

    public get selected(): boolean {
        return this._selected;
    }

    private _selected = false;

    constructor(
        private readonly hostElementRef: ElementRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-grid-item');
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const hostElement = this.hostElementRef.nativeElement;
        const isClickOutsideWindow = OutsideClick.checkForElement(hostElement, event);

        if (isClickOutsideWindow && this.selected) {
            this.selected = false;
        }
    }

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        if (this.data.onClick) {
            this.data.onClick(event);
        }

        this.osClick.emit(event);
    }

    @HostListener('dblclick', ['$event'])
    public onDblClick(event: MouseEvent): void {
        if (this.data.onDblClick) {
            this.data.onDblClick(event);
        }

        this.osDblclick.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event: MouseEvent): void {
        this.selected = true;

        this.osMousedown.emit(event);
    }
}
