import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[os-draggable]'
})
export class OsDraggableDirective implements OnInit, OnDestroy {

    @Input()
    public dragConfig: any;

    constructor (
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit (): void {}

    public ngOnDestroy (): void {}

}
