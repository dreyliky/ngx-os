import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    Host,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Self,
    TemplateRef
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { ɵEventOutside } from '../../../core';
import { MenuBarButtonComponent, MenuBarComponent } from '../components';
import { ɵMenuBarCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: 'os-menu-bar-button[osMenuBar]',
    exportAs: 'osMenuBar'
})
export class MenuBarDirective implements OnInit, OnDestroy {
    /** Content to show inside */
    @Input('osMenuBar')
    public content: TemplateRef<unknown>;

    private containerElement: HTMLDivElement | null;

    private readonly delayBeforeDestroy = 500;
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Host() private readonly menuBarComponent: MenuBarComponent,
        @Self() private readonly buttonComponent: MenuBarButtonComponent,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.initMouseOverObserver();
        this.initButtonComponentActiveObserver();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    /** @internal */
    @HostListener('mousedown', ['$event'])
    public onHostMouseDown(event: PointerEvent): void {
        if (!this.containerElement) {
            this.show();
            this.initClickOutsideObserver();
            this.menuBarComponent._setActiveButtonComponent(this.buttonComponent);
            event.stopPropagation();
        } else {
            this.hide();
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
    }

    private show(): void {
        this.createContainerElementIfAbsent();
        this.adaptContainerElementPosition();
        this.applyContentForContainerElement();
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.Container);
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
        const view = template.createEmbeddedView(null);

        view.detectChanges();
        this.containerElement.append(...view.rootNodes);
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
                this.menuBarComponent._resetActiveButtonComponent();
                this.menuBarComponent._setActiveButtonComponent(this.buttonComponent);
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
        fromEvent<PointerEvent>(this.document, 'mousedown')
            .pipe(
                filter((event) => ɵEventOutside.checkForElement(this.containerElement, event)),
                first(),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => this.menuBarComponent._resetActiveButtonComponent());
    }
}
