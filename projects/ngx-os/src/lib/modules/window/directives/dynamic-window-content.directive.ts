import { Directive, ViewContainerRef } from '@angular/core';

/** @internal */
@Directive({
    selector: '[dynamicWindowContent]'
})
export class DynamicWindowContentDirective {
    constructor(
        public readonly viewContainerRef: ViewContainerRef
    ) {}
}
