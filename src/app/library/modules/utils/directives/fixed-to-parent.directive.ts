import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { EventOutside, IntervalCheckerHelper as IntervalChecker } from '../../../core';
import { FixedToParentConfig } from '../classes';

@Directive({
    selector: '[os-fixed-to-parent]'
})
export class FixedToParentDirective implements OnInit {
    @Input('os-fixed-to-parent')
    public set config(config: FixedToParentConfig) {
        this._config = { ...this._config, ...config };
    }

    private _config = new FixedToParentConfig();

    private targetElement: HTMLElement;
    private parentElement: HTMLElement;

    private readonly intervalChecker = new IntervalChecker();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.targetElement = this.hostElementRef.nativeElement;
        this.parentElement = this.targetElement.parentElement;

        this.adjustCoordinates();
    }

    @HostListener('document:wheel', ['$event'])
    public onDocumentWheel(event: WheelEvent): void {
        if (this._config.isEnabled) {
            const isEventOutsideTargetElement = EventOutside.checkForElement(this.targetElement, event);

            if (isEventOutsideTargetElement) {
                this.intervalChecker.start({
                    onIteration: () => this.adjustCoordinates()
                });
            }
        }
    }

    private adjustCoordinates(): void {
        if (this._config.isEnabled) {
            const { left, top, width, height } = this.parentElement.getBoundingClientRect();

            this.targetElement.style.left = `${left}px`;
            this.targetElement.style.top = `${(top + height)}px`;
            this.targetElement.style.width = `${width}px`;
        }
    }
}
