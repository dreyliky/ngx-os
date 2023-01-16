import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    Inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef
} from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { debounce, filter, finalize, share, takeUntil } from 'rxjs/operators';
import {
    ɵApplyAutoDestroyClass,
    ɵDestroyService,
    ɵElementPositionWithinViewport,
    ɵGlobalEvents,
    ɵIsString,
    ɵIsTemplateRef
} from '../../../core';
import { ɵHintCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: '[osHint]',
    providers: [
        ɵDestroyService
    ]
})
export class HintDirective implements OnInit, OnDestroy {
    /** Content to show inside */
    @Input('osHint')
    public content: string | TemplateRef<unknown>;

    /** Hint offset in pixels from the mouse by X-axis */
    @Input('osHintMouseOffsetX')
    public offsetX = 16;

    /** Hint offset in pixels from the mouse by Y-axis */
    @Input('osHintMouseOffsetY')
    public offsetY = 16;

    /** Hint delay before showing in milliseconds */
    @Input()
    public osHintDisplayDelay = 700;

    /** Is hint enabled? */
    @Input()
    public osHintEnabled = true;

    private containerElement: HTMLDivElement | null;

    private readonly mouseLeave$ = fromEvent<MouseEvent>(this.hostRef.nativeElement, 'mouseleave')
        .pipe(share());

    private readonly mouseDown$ = fromEvent(this.hostRef.nativeElement, 'mousedown')
        .pipe(share());

    private readonly destroyedOrMouseDownOrLeave$ = merge(
        this.viewDestroyed$,
        this.mouseLeave$,
        this.mouseDown$
    );

    private readonly shouldBeHiddenWhen$ = merge(
        this.globalEvents.fromDocument('mousedown'),
        this.globalEvents.fromDocument('touchstart'),
        this.globalEvents.fromDocument('contextmenu')
    );

    private readonly delayBeforeDestroy = 500;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly globalEvents: ɵGlobalEvents,
        private readonly elementPositionWithinViewport: ɵElementPositionWithinViewport,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly injector: Injector
    ) {}

    public ngOnInit(): void {
        this.initMouseOverObserver();
        this.initMouseLeaveObserver();
        this.initHintShouldBeHiddenWhenObserver();
    }

    public ngOnDestroy(): void {
        this.hide();
    }

    private show(event: MouseEvent): void {
        this.createContainerElementIfAbsent();
        this.applyContentForContainerElement();
        this.adaptContainerElementPosition(event);
        ɵApplyAutoDestroyClass(this.containerElement, CssClass.Opening);
    }

    private hide(): void {
        if (this.containerElement) {
            const containerElement = this.containerElement;
            this.containerElement = null;

            containerElement.classList.add(CssClass.Hiding);

            setTimeout(() => {
                this.document.body.removeChild(containerElement);
            }, this.delayBeforeDestroy);
        }
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.Hint);
            this.document.body.appendChild(this.containerElement);
        }
    }

    private adaptContainerElementPosition(event: MouseEvent): void {
        const containerRect = this.containerElement.getBoundingClientRect();
        const { x, y } = this.elementPositionWithinViewport.calculateNearPointer({
            pointerPosition: { x: event.clientX, y: event.clientY },
            element: {
                width: containerRect.width,
                height: containerRect.height,
                offset: { x: this.offsetX, y: this.offsetY }
            }
        });
        this.containerElement.style.left = `${x}px`;
        this.containerElement.style.top = `${y}px`;
    }

    private applyContentForContainerElement(): void {
        const content = this.content;
        this.containerElement.innerHTML = '';

        if (ɵIsString(content)) {
            this.containerElement.innerHTML = content;
        } else if (ɵIsTemplateRef(content)) {
            this.fillContainerElementContentByTemplateRef(content);
        }
    }

    private fillContainerElementContentByTemplateRef(template: TemplateRef<unknown>): void {
        const view = template.createEmbeddedView(null, this.injector);

        view.detectChanges();
        view.rootNodes.forEach((node) => this.containerElement.appendChild(node));
    }

    private initHintShouldBeHiddenWhenObserver(): void {
        this.shouldBeHiddenWhen$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.hide());
    }

    private initMouseOverObserver(): void {
        fromEvent<MouseEvent>(this.hostRef.nativeElement, 'mousemove')
            .pipe(
                filter(() => this.osHintEnabled),
                debounce(() => timer(this.osHintDisplayDelay)),
                finalize(() => this.hide()),
                takeUntil(this.destroyedOrMouseDownOrLeave$)
            )
            .subscribe((event) => this.show(event));
    }

    private initMouseLeaveObserver(): void {
        this.mouseLeave$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.hide();
                this.initMouseOverObserver();
            });
    }
}
