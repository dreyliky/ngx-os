import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { OutsideClick } from '@lib-helpers';
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

        this.classlistManager.applyOneAsFlag('selected', selected);
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
        this.classlistManager.add('os-grid-item');
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const hostElement = this.hostElementRef.nativeElement;
        const isClickOutsideWindow = OutsideClick.checkForElement(hostElement, event);

        if (isClickOutsideWindow && this.selected) {
            this.selected = false;
        }
    }

    protected onClick(event: PointerEvent): void {
        if (this.data.onClick) {
            this.data.onClick(event);
        }

        super.onClick(event);
    }

    protected onMouseDown(event: MouseEvent): void {
        this.selected = true;

        super.onMouseDown(event);
    }

    protected onDblClick(event: MouseEvent): void {
        if (this.data.onDblClick) {
            this.data.onDblClick(event);
        }

        super.onDblClick(event);
    }
}
