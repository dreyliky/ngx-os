import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, timer } from 'rxjs';
import { debounce, filter, finalize, share, takeUntil } from 'rxjs/operators';
import { ɵIsString, ɵIsTemplateRef } from '../../../core';
import { ɵHintCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: '[osHint]'
})
export class HintDirective implements OnInit, OnDestroy {
    /** Content to show inside */
    @Input('osHint')
    public content: string | TemplateRef<unknown>;

    /** Hint offset in pixels from the mouse by X-axis */
    @Input()
    public osHintMouseOffsetX = 16;

    /** Hint offset in pixels from the mouse by Y-axis */
    @Input()
    public osHintMouseOffsetY = 16;

    /** Hint delay before showing in milliseconds */
    @Input()
    public osHintDisplayDelay = 300;

    /** Is hint enabled? */
    @Input()
    public osHintEnabled = true;

    private hintContainerElement: HTMLDivElement | null;

    private readonly mouseLeave$ = fromEvent<MouseEvent>(this.hostRef.nativeElement, 'mouseleave')
        .pipe(
            share()
        );

    private get destroyedOrMouseLeave$(): Observable<unknown> {
        return merge(
            this.destroyed$,
            this.mouseLeave$
        );
    }

    private readonly delayBeforeDestroy = 600;
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.initMouseOverObserver();
        this.initMouseLeaveObserver();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    private show(event: MouseEvent): void {
        this.createContainerElementIfAbsent();
        this.adaptContainerElementPosition(event);
        this.applyContentForContainerElement();
    }

    private hide(): void {
        if (this.hintContainerElement) {
            const hintContainerElement = this.hintContainerElement;
            this.hintContainerElement = null;

            hintContainerElement.classList.add(CssClass.Hiding);

            setTimeout(() => {
                this.document.body.removeChild(hintContainerElement);
            }, this.delayBeforeDestroy);
        }
    }

    private createContainerElementIfAbsent(): void {
        if (!this.hintContainerElement) {
            this.hintContainerElement = document.createElement('div');

            this.hintContainerElement.classList.add(CssClass.Hint);
            this.document.body.appendChild(this.hintContainerElement);
        }
    }

    private adaptContainerElementPosition(event: MouseEvent): void {
        const x = (event.pageX + this.osHintMouseOffsetX);
        const y = (event.pageY + this.osHintMouseOffsetY);

        this.hintContainerElement.style.left = `${x}px`;
        this.hintContainerElement.style.top = `${y}px`;
    }

    private applyContentForContainerElement(): void {
        const content = this.content;
        this.hintContainerElement.innerHTML = '';

        if (ɵIsString(content)) {
            this.hintContainerElement.innerHTML = content;
        } else if (ɵIsTemplateRef(content)) {
            this.fillContainerElementContentByTemplateRef(content);
        }
    }

    private fillContainerElementContentByTemplateRef(template: TemplateRef<unknown>): void {
        const view = template.createEmbeddedView(null);

        view.detectChanges();
        view.rootNodes.forEach((node) => this.hintContainerElement.appendChild(node));
    }

    private initMouseOverObserver(): void {
        fromEvent<MouseEvent>(this.hostRef.nativeElement, 'mousemove')
            .pipe(
                filter(() => this.osHintEnabled),
                debounce(() => timer(this.osHintDisplayDelay)),
                finalize(() => this.hide()),
                takeUntil(this.destroyedOrMouseLeave$)
            )
            .subscribe((event) => this.show(event));
    }

    private initMouseLeaveObserver(): void {
        this.mouseLeave$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.hide();
                this.initMouseOverObserver();
            });
    }
}
