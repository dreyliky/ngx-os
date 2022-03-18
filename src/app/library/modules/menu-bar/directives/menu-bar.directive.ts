import { DOCUMENT } from '@angular/common';
import {
    Directive,
    DoCheck,
    ElementRef,
    EmbeddedViewRef, HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Self,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { ɵEventOutside } from '../../../core';
import { MenuBarButtonComponent, MenuBarComponent } from '../components';
import { ɵMenuBarCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: 'os-menu-bar-button[osMenuBar]',
    exportAs: 'osMenuBar'
})
export class MenuBarDirective implements OnInit, OnDestroy, DoCheck {
    /** Content to show inside */
    @Input('osMenuBar')
    public content: TemplateRef<unknown>;

    private get destroyedOrHidden$(): Observable<boolean> {
        return merge(
            this.destroyed$,
            this.hidden$
        );
    }

    private containerElement: HTMLDivElement | null;
    private viewRef: EmbeddedViewRef<unknown> | null;
    private clickOutsideSubscription: Subscription | null;

    private readonly delayBeforeDestroy = 500;
    private readonly hidden$ = new Subject<boolean>();
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Self() private readonly buttonComponent: MenuBarButtonComponent,
        private readonly menuBarComponent: MenuBarComponent,
        private readonly containerRef: ViewContainerRef,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.initMouseOverObserver();
        this.initButtonComponentActiveObserver();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.hide();
    }

    public ngDoCheck(): void {
        this.viewRef?.detectChanges();
    }

    /** @internal */
    @HostListener('mousedown')
    public onHostMouseDown(): void {
        if (!this.containerElement) {
            this.menuBarComponent._openMenuBar(this.buttonComponent);
        } else {
            this.menuBarComponent._hideAllMenuBars();
        }
    }

    public hide(): void {
        if (this.containerElement) {
            const hintContainerElement = this.containerElement;
            this.containerElement = null;

            hintContainerElement.classList.add(CssClass.Hiding);

            setTimeout(() => {
                this.document.body.removeChild(hintContainerElement);
            }, this.delayBeforeDestroy);
        }

        this.hidden$.next(true);
        this.onHide();
    }

    private show(): void {
        this.createContainerElementIfAbsent();
        this.adaptContainerElementPosition();
        this.applyContentForContainerElement();
        this.onShow();
    }

    private onShow(): void {
        setTimeout(() => this.initClickOutsideObserver());
    }

    private onHide(): void {
        this.clickOutsideSubscription?.unsubscribe();
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.Container);
            this.containerElement.addEventListener('click', (event) => event.stopPropagation());
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
        this.viewRef = this.containerRef.createEmbeddedView(template);

        this.containerElement.append(...this.viewRef.rootNodes);
    }

    private initMouseOverObserver(): void {
        fromEvent<PointerEvent>(this.hostRef.nativeElement, 'mouseover')
            .pipe(
                filter(() => (
                    !!this.menuBarComponent.activeButton &&
                    (this.menuBarComponent.activeButton !== this.buttonComponent)
                )),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => {
                this.menuBarComponent._hideAllMenuBars();
                this.menuBarComponent._openMenuBar(this.buttonComponent);
            });
    }

    private initButtonComponentActiveObserver(): void {
        this.menuBarComponent.activeButtonChange
            .pipe(
                map((button) => (button === this.buttonComponent)),
                takeUntil(this.destroyed$)
            )
            .subscribe((isActive) => (isActive) ? this.show() : this.hide());
    }

    private initClickOutsideObserver(): void {
        this.clickOutsideSubscription = fromEvent<PointerEvent>(this.document, 'mousedown')
            .pipe(
                filter((event) => ɵEventOutside.checkForElement(this.containerElement, event)),
                first(),
                takeUntil(this.destroyedOrHidden$)
            )
            .subscribe(() => this.menuBarComponent._hideAllMenuBars());
    }
}
