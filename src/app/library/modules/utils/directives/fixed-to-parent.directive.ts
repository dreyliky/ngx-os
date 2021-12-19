import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnInit
} from '@angular/core';
import { filter } from 'rxjs/operators';
import {
    ɵEventOutside,
    ɵGlobalEvents,
    ɵIntervalCheckerHelper as IntervalChecker
} from '../../../core';
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
    selector: '[osFixedToParent]'
})
export class FixedToParentDirective implements OnChanges, OnInit, AfterViewInit {
    /** Configuration of directive */
    @Input('osFixedToParent')
    public parameters: FixedToParentConfig | undefined | '';

    /** Configuration of directive */
    public get config(): FixedToParentConfig {
        return this._config;
    }

    private _config = new FixedToParentConfig();
    private targetElement: HTMLElement;
    private parentElement: HTMLElement;

    private readonly intervalChecker = new IntervalChecker();

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly globalEvents: ɵGlobalEvents
    ) {}

    public ngOnChanges(): void {
        this._config = { ...this._config, ...this.parameters };

        this.updateIntervalCheckerSettings();
    }

    public ngOnInit(): void {
        this.initDocumentWheelObserver();
    }

    public ngAfterViewInit(): void {
        this.targetElement = this.hostRef.nativeElement;
        this.parentElement = this.targetElement.parentElement;

        this.adjustCoordinates();
    }

    /** @internal */
    private initDocumentWheelObserver(): void {
        this.globalEvents.fromDocument('wheel')
            .pipe(
                filter(() => this._config.isEnabled),
                filter((event) => ɵEventOutside.checkForElement(this.targetElement, event))
            )
            .subscribe(() => {
                this.intervalChecker.start({
                    onIteration: () => this.adjustCoordinates()
                });
            });
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
