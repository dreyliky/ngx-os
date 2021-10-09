import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AppendToBodyConfig } from '../classes';

/**
 * @dynamic
 *
 * Moves element into the `body` element
 **/
// See: https://github.com/angular/angular/issues/20351
@Directive({
    selector: '[os-append-to-body]'
})
export class AppendToBodyDirective implements OnInit, OnDestroy, OnChanges {
    /** Configuration of directive */
    @Input('os-append-to-body')
    public set config(config: AppendToBodyConfig) {
        this._config = { ...this._config, ...config };
    }

    private targetElement: HTMLElement;
    private parentElement: HTMLElement;
    private initialStylePosition: string;

    private _config = new AppendToBodyConfig();

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

    private processElement(): void {
        if (this._config.isEnabled) {
            this.applyNeededStyles();
            this.appendElementToBody();
        } else {
            this.resetAppliedNeededStyles();
            this.appendElementToParent();
        }
    }

    private applyNeededStyles(): void {
        this.initialStylePosition = this.targetElement.style.position;
        this.targetElement.style.position = 'absolute';
    }

    private appendElementToBody(): void {
        this.parentElement.removeChild(this.targetElement);
        this.document.body.appendChild(this.targetElement);
    }

    private appendElementToParent(): void {
        try {
            this.document.body?.removeChild?.(this.targetElement);
            this.parentElement?.appendChild?.(this.targetElement);
        } catch (error) {}
    }

    private resetAppliedNeededStyles(): void {
        if (this.initialStylePosition) {
            this.targetElement.style.position = this.initialStylePosition;
        }
    }
}
