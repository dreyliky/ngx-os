import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    Inject, Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, timer } from 'rxjs';
import { debounce, filter, finalize, share, takeUntil } from 'rxjs/operators';
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
    public osHintDisplayDelay = 500;

    /** Is hint enabled? */
    @Input()
    public osHintEnabled = true;

    private hintContainerElement: HTMLDivElement | null;

    private readonly mouseLeave$ = fromEvent(this.hostRef.nativeElement, 'mouseleave')
        .pipe(share());

    private get destroyedOrMouseLeave$(): Observable<unknown> {
        return merge(
            this.destroyed$,
            this.mouseLeave$
        );
    }

    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hostRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef
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
        const { pageX, pageY } = event;

        if (!this.hintContainerElement) {
            this.hintContainerElement = document.createElement('div');

            this.hintContainerElement.classList.add(CssClass.Hint);
            this.document.body.appendChild(this.hintContainerElement);
        }

        this.hintContainerElement.style.left = `${pageX + this.osHintMouseOffsetX}px`;
        this.hintContainerElement.style.top = `${pageY + this.osHintMouseOffsetY}px`;

        this.applyContentForContainerElement();
    }

    private hide(): void {
        if (this.hintContainerElement) {
            this.document.body.removeChild(this.hintContainerElement);
            this.hintContainerElement = null;
        }
    }

    private applyContentForContainerElement(): void {
        this.hintContainerElement.innerHTML = '';

        if (typeof this.content === 'string') {
            this.hintContainerElement.innerHTML = this.content;
        } else {
            const content = this.content as TemplateRef<unknown>;
            const view = content.createEmbeddedView(null);

            view.detectChanges();

            view.rootNodes
                .forEach((node) => this.hintContainerElement.appendChild(node));
        }
    }

    private initMouseOverObserver(): void {
        fromEvent(this.hostRef.nativeElement, 'mousemove')
            .pipe(
                filter(() => this.osHintEnabled),
                debounce(() => timer(this.osHintDisplayDelay)),
                finalize(() => this.hide()),
                takeUntil(this.destroyedOrMouseLeave$)
            )
            .subscribe((event: MouseEvent) => this.show(event));
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
