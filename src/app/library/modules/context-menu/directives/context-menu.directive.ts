import { DOCUMENT } from '@angular/common';
import {
    Directive,
    DoCheck,
    EmbeddedViewRef,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { ɵEventOutside } from '../../../core';
import { ɵContextMenuCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: '[osContextMenu]',
    exportAs: 'osContextMenu'
})
export class ContextMenuDirective implements DoCheck, OnDestroy {
    /** Content to show inside */
    @Input('osContextMenu')
    public content: TemplateRef<unknown>;

    private containerElement: HTMLDivElement | null;
    private viewRef: EmbeddedViewRef<unknown>;

    private readonly delayBeforeDestroy = 500;
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly containerRef: ViewContainerRef
    ) {}

    public ngDoCheck(): void {
        this.viewRef?.detectChanges();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    @HostListener('contextmenu', ['$event'])
    public onDocumentContextMenuEvent(event: MouseEvent): void {
        this.show(event);
        this.initClickOutsideObserver();
        event.preventDefault();
        event.stopPropagation();
    }

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
        this.adaptContainerElementPosition(event);
        this.applyContentForContainerElement();
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.Container);
            this.containerElement.addEventListener('click', (event) => event.stopPropagation());
            this.document.body.appendChild(this.containerElement);
        }
    }

    private adaptContainerElementPosition(event: MouseEvent): void {
        this.containerElement.style.left = `${event.pageX}px`;
        this.containerElement.style.top = `${event.pageY}px`;
    }

    private applyContentForContainerElement(): void {
        this.containerElement.innerHTML = '';

        this.fillContainerElementContentByTemplateRef(this.content);
    }

    private fillContainerElementContentByTemplateRef(
        template: TemplateRef<unknown>
    ): void {
        this.viewRef = this.containerRef.createEmbeddedView(template);

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
