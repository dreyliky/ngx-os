import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { EventOutside, IntervalCheckerHelper as IntervalChecker } from '@lib-helpers';
import { AppendToBodyConfig } from '../classes';

@Directive({
    selector: '[os-append-to-body]'
})
export class AppendToBodyDirective implements OnInit, OnDestroy, OnChanges {
    @Input('os-append-to-body')
    public set appendToBodyConfig(config: AppendToBodyConfig) {
        this._config = { ...this._config, ...config };
    }

    private _config = new AppendToBodyConfig();

    private targetElement: HTMLElement;
    private parentElement: HTMLElement;

    private readonly intervalChecker = new IntervalChecker();

    private initialStylePosition: string;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.targetElement = this.hostElementRef.nativeElement;
        this.parentElement = this.targetElement.parentElement;

        this.processElement();
    }

    public ngOnDestroy(): void {
        this.hostElementRef?.nativeElement?.remove();
    }

    public ngOnChanges(): void {
        if (this.targetElement) {
            this.processElement();
        }
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

    private processElement(): void {
        if (this._config.isEnabled) {
            this.applyNeededStyles();
            this.appendElementToBody();
        } else {
            this.resetAppliedNeededStyles();
            this.appendElementToInitialPlace();
        }
    }

    private appendElementToBody(): void {
        this.parentElement.removeChild(this.targetElement);
        this.document.body.appendChild(this.targetElement);
        this.adjustCoordinates();
    }

    private adjustCoordinates(): void {
        const { left, top, width, height } = this.parentElement.getBoundingClientRect();

        this.targetElement.style.left = `${left}px`;
        this.targetElement.style.top = `${(top + height)}px`;
        this.targetElement.style.width = `${width}px`;
    }

    private applyNeededStyles(): void {
        this.initialStylePosition = this.targetElement.style.position;
        this.targetElement.style.position = 'absolute';
    }

    private appendElementToInitialPlace(): void {
        try {
            this.document.body.removeChild(this.targetElement);
            this.parentElement.appendChild(this.targetElement);
        } catch (error) {}
    }

    private resetAppliedNeededStyles(): void {
        if (this.initialStylePosition) {
            this.targetElement.style.position = this.initialStylePosition;
        }
    }
}
