import { DOCUMENT } from '@angular/common';
import {
    Directive,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    TemplateRef
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { ɵEventOutside } from '../../../core';
import { ɵContextMenuCssClassEnum as CssClass } from '../enums';

@Directive({
    selector: '[osContextMenu]',
    exportAs: 'osContextMenu'
})
export class ContextMenuDirective implements OnDestroy {
    /** Content to show inside */
    @Input('osContextMenu')
    public content: TemplateRef<unknown>;

    private containerElement: HTMLDivElement | null;

    private readonly delayBeforeDestroy = 500;
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document
    ) {}

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    @HostListener('contextmenu', ['$event'])
    public onDocumentContextMenuEvent(event: MouseEvent): void {
        this.show(event);
        this.initClickOutsideObserver();
        event.preventDefault();
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

    private show(event: MouseEvent): void {
        this.createContainerElementIfAbsent();
        this.adaptContainerElementPosition(event);
        this.applyContentForContainerElement();
    }

    private createContainerElementIfAbsent(): void {
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');

            this.containerElement.classList.add(CssClass.ContextMenu);
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
        const view = template.createEmbeddedView(null);

        view.detectChanges();
        this.containerElement.append(...view.rootNodes);
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
