import { DOCUMENT } from '@angular/common';
import {
    Directive,
    DoCheck,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Self,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, skip } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { ɵApplyAutoDestroyClass, ɵDestroyService, ɵEventOutside } from '../../../core';
import { MenuBarButtonComponent } from '../components';
import { ɵMenuBarCssClassEnum as CssClass } from '../enums';
import { ɵMenuBarActiveButtonState } from '../states';

@Directive({
    selector: 'button[os-menu-bar-button][osMenuBar]',
    exportAs: 'osMenuBar',
    providers: [
        ɵDestroyService
    ]
})
export class MenuBarDirective implements OnInit, OnDestroy, DoCheck {
    /** Content to show inside */
    @Input('osMenuBar')
    public content: TemplateRef<unknown>;

    public get isOpened(): boolean {
        return this._isOpened$.getValue();
    }

    public get isOpened$(): Observable<boolean> {
        return this._isOpened$.asObservable();
    }

    private get destroyedOrClosed$(): Observable<boolean> {
        return merge(
            this.viewDestroyed$,
            this._isOpened$
                .pipe(
                    skip(1),
                    filter((isOpened) => !isOpened)
                )
        );
    }

    private containerElement: HTMLDivElement | null;
    private viewRef: EmbeddedViewRef<unknown> | null;

    private readonly delayBeforeDestroy = 500;
    private readonly _isOpened$ = new BehaviorSubject<boolean>(false);

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Self() private readonly buttonComponent: MenuBarButtonComponent,
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly activeButtonState: ɵMenuBarActiveButtonState,
        private readonly containerRef: ViewContainerRef,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly injector: Injector
    ) {}

    public ngOnInit(): void {
        this.initMouseOverObserver();
        this.initButtonComponentActiveObserver();
    }

    public ngOnDestroy(): void {
        this.close();
    }

    public ngDoCheck(): void {
        this.viewRef?.detectChanges();
    }

    /** @internal */
    @HostListener('mousedown')
    public onHostMouseDown(): void {
        if (!this.containerElement) {
            this.activeButtonState.set(this.buttonComponent);
        } else {
            this.activeButtonState.clear();
        }
    }

    /** Open MenuBar container */
    public open(): void {
        this._isOpened$.next(true);
        this.activeButtonState.set(this.buttonComponent);
    }

    /** Close MenuBar container */
    public close(): void {
        if (this.containerElement) {
            const containerElement = this.containerElement;
            this.containerElement = null;

            containerElement.classList.add(CssClass.Hiding);

            setTimeout(() => {
                this.document.body.removeChild(containerElement);
            }, this.delayBeforeDestroy);
            this._isOpened$.next(false);
        }
    }

    private show(): void {
        this.createContainerElementIfAbsent();
        this.adaptContainerElementPosition();
        this.applyContentForContainerElement();
        ɵApplyAutoDestroyClass(this.containerElement, CssClass.Opening);
        // Waiting ~4 ms for skipping currently bubbling click event, which probably triggered our MenuBar.
        setTimeout(() => this.initClickOutsideObserver());
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.Container);
            this.containerElement.addEventListener('mousedown', (event) => event.stopPropagation());
            this.document.body.appendChild(this.containerElement);
        }
    }

    private adaptContainerElementPosition(): void {
        const { top, left: x, height } = this.hostRef.nativeElement.getBoundingClientRect();
        const y = (top + height);

        this.containerElement.style.left = `${x}px`;
        this.containerElement.style.top = `${y}px`;
    }

    private applyContentForContainerElement(): void {
        this.containerElement.innerHTML = '';

        this.fillContainerElementContentByTemplateRef(this.content);
    }

    private fillContainerElementContentByTemplateRef(template: TemplateRef<unknown>): void {
        this.viewRef = this.containerRef
            .createEmbeddedView(template, null, { injector: this.injector });

        this.containerElement.append(...this.viewRef.rootNodes);
    }

    private initMouseOverObserver(): void {
        fromEvent<PointerEvent>(this.hostRef.nativeElement, 'mouseover')
            .pipe(
                filter(() => !!this.activeButtonState.data),
                filter(() => (this.activeButtonState.data !== this.buttonComponent)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.activeButtonState.set(this.buttonComponent));
    }

    private initButtonComponentActiveObserver(): void {
        this.activeButtonState.data$
            .pipe(
                skip(1),
                map((activeButton) => (activeButton === this.buttonComponent)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((isActive) => (isActive) ? this.show() : this.close());
    }

    private initClickOutsideObserver(): void {
        fromEvent<PointerEvent>(this.document, 'mousedown')
            .pipe(
                filter((event) => ɵEventOutside.checkForElement(this.containerElement, event)),
                first(),
                takeUntil(this.destroyedOrClosed$)
            )
            .subscribe(() => this.activeButtonState.clear());
    }
}
