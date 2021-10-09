import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { EventOutside, IntervalCheckerHelper as IntervalChecker } from '../../../core';
import { FixedToParentConfig } from '../classes';

/**
 * Adapts the position of the element to the position of the parent element.
 *
 * Useful when used with the {@link AppendToBodyDirective}.
 *
 * The child element will be appended to the body and "save" position near the parent element
 * as if it continues to be inside the parent element.
 **/
@Directive({
    selector: '[os-fixed-to-parent]'
})
export class FixedToParentDirective implements AfterViewInit {
    /** Configuration of directive */
    @Input('os-fixed-to-parent')
    public set config(config: FixedToParentConfig) {
        this._config = { ...this._config, ...config };

        this.updateIntervalCheckerSettings();
    }

    private _config = new FixedToParentConfig();

    private targetElement: HTMLElement;
    private parentElement: HTMLElement;

    private readonly intervalChecker = new IntervalChecker();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        this.targetElement = this.hostElementRef.nativeElement;
        this.parentElement = this.targetElement.parentElement;

        this.adjustCoordinates();
    }

    /** @internal */
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

    private updateIntervalCheckerSettings(): void {
        this.intervalChecker.updateSettings({
            delayBetweenChecksInMs: this._config.recalculationIntervalInMs,
            maxCheckCount: this._config.calculationIterationsCount
        });
    }
}
