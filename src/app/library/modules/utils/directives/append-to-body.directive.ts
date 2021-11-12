import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy
} from '@angular/core';
import { AppendToBodyConfig } from '../classes';

/** Moves element into the `body` element **/
@Directive({
    selector: '[osAppendToBody]'
})
export class AppendToBodyDirective implements AfterViewInit, OnDestroy, OnChanges {
    /** Configuration of directive */
    @Input('osAppendToBody')
    public set config(config: AppendToBodyConfig) {
        this._config = { ...this._config, ...config };
    }

    private targetElement: HTMLElement;
    private parentElement: HTMLElement;
    private initialStylePosition: string;

    private _config = new AppendToBodyConfig();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        this.targetElement = this.hostRef.nativeElement;
        this.parentElement = this.targetElement.parentElement;

        // When used in pair with `FixedToParentDirective`,
        // this solves the problem of incorrect determining of
        // the parent element by `FixedToParentDirective`.
        queueMicrotask(() => this.processElement());
    }

    public ngOnDestroy(): void {
        this.hostRef?.nativeElement?.remove();
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
