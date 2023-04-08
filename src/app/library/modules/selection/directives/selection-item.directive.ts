import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[osSelectionItem]',
    exportAs: 'osSelectionItem'
})
export class SelectionItemDirective<T = any> {
    /** Payload with custom data of your item */
    @Input('osSelectionItem')
    public data: T;

    /** Fires when the item intersects the `selection zone`. */
    @Output()
    public osItemSelected: EventEmitter<T> = new EventEmitter();

    /** Fires when the item no more intersects the `selection zone`. */
    @Output()
    public osItemDeselected: EventEmitter<T> = new EventEmitter();

    /** Is your selection item selected? */
    public get isSelected(): boolean {
        return this._isSelected;
    }

    /** HTML Element of your `selection item` */
    public get htmlElement(): HTMLElement {
        return this.hostRef.nativeElement;
    }

    private _isSelected = false;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    /** @internal */
    public _select(): void {
        this._isSelected = true;

        this.osItemSelected.emit(this.data);
    }

    /** @internal */
    public _deselect(): void {
        this._isSelected = false;

        this.osItemDeselected.emit(this.data);
    }
}
