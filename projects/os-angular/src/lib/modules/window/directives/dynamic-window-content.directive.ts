import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamicWindowContent]'
})
export class DynamicWindowContentDirective {
    constructor(
        public readonly viewContainerRef: ViewContainerRef
    ) {}
}
