import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'input[osAutofocus], textarea[osAutofocus], button[osAutofocus]',
    exportAs: 'osAutofocus'
})
export class AutofocusDirective implements AfterViewInit {
    constructor(
        private readonly elementRef: ElementRef<HTMLInputElement>
    ) {}

    public ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
    }
}
