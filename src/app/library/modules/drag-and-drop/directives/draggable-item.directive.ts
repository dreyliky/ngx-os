import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[osDraggableItem]'
})
export class DraggableItemDirective<T = any> {
    @Input('osDraggableItem')
    public data: T | undefined | null;
}
