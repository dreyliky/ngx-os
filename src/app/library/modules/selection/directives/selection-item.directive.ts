import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[osSelectionItem]'
})
export class SelectionItemDirective<T = any> {
    @Input('osSelectionItem')
    public data: T;

    @Output()
    public osItemSelected: EventEmitter<T> = new EventEmitter();

    @Output()
    public osItemDeselected: EventEmitter<T> = new EventEmitter();

    public get isSelected(): boolean {
        return this._isSelected;
    }

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
