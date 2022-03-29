import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[osSelectionItem]'
})
export class SelectionItemDirective<T = any> {
    @Input()
    public selectionData: T;

    @Output()
    public osItemSelected = new EventEmitter<T>();

    @Output()
    public osItemDeselected = new EventEmitter<T>();

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

        this.osItemSelected.emit(this.selectionData);
    }

    /** @internal */
    public _deselect(): void {
        this._isSelected = false;

        this.osItemDeselected.emit(this.selectionData);
    }
}
