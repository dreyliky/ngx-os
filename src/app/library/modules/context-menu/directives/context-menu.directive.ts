import { DOCUMENT } from '@angular/common';
import {
    Directive,
    DoCheck,
    EmbeddedViewRef,
    HostListener,
    Inject,
    Injector,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import {
    ɵApplyAutoDestroyClass,
    ɵElementPositionWithinViewport,
    ɵEventOutside
} from '../../../core';
import { ɵContextMenuCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: '[osContextMenu]',
    exportAs: 'osContextMenu'
})
export class ContextMenuDirective implements DoCheck, OnDestroy {
    /** Content to show inside */
    @Input('osContextMenu')
    public content: TemplateRef<unknown>;

    /** Context Menu offset in pixels from the pointer by X-axis */
    @Input('osContextMenuPointerOffsetX')
    public offsetX = 0;

    /** Context Menu offset in pixels from the pointer by Y-axis */
    @Input('osContextMenuPointerOffsetY')
    public offsetY = 0;

    private containerElement: HTMLDivElement | null;
    private viewRef: EmbeddedViewRef<unknown>;

    private readonly delayBeforeDestroy = 500;
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly elementPositionWithinViewport: ɵElementPositionWithinViewport,
        private readonly containerRef: ViewContainerRef,
        private readonly injector: Injector
    ) {}

    public ngDoCheck(): void {
        this.viewRef?.detectChanges();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    /** @internal */
    @HostListener('contextmenu', ['$event'])
    public onDocumentContextMenuEvent(event: MouseEvent): void {
        this.show(event);
        this.initClickOutsideObserver();
        event.preventDefault();
    }

    /** Hide Context Menu */
    public hide(): void {
        if (this.containerElement) {
            const menuContainerElement = this.containerElement;
            this.containerElement = null;

            menuContainerElement.classList.add(CssClass.Hiding);

            setTimeout(() => {
                this.document.body.removeChild(menuContainerElement);
            }, this.delayBeforeDestroy);
        }
    }

    private show(event: MouseEvent): void {
        this.createContainerElementIfAbsent();
        this.applyContentForContainerElement();
        this.adaptContainerElementPosition(event);
        ɵApplyAutoDestroyClass(this.containerElement, CssClass.Opening);
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.Container);
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
        this.containerElement.innerHTML = '';

        this.fillContainerElementContentByTemplateRef(this.content);
    }

    private fillContainerElementContentByTemplateRef(
        template: TemplateRef<unknown>
    ): void {
        this.viewRef = this.containerRef
            .createEmbeddedView(template, null, { injector: this.injector });

        this.containerElement.append(...this.viewRef.rootNodes);
    }

    private initClickOutsideObserver(): void {
        fromEvent(this.document, 'mousedown')
            .pipe(
                filter((event) => ɵEventOutside.checkForElement(this.containerElement, event)),
                first(),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => this.hide());
    }
}
