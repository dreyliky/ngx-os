import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { ɵCommonCssClassEnum as CommonCssClass, ɵGlobalEvents } from '../../../core';
import { ɵSelectionCssClassEnum as CssClass } from '../enums';
import { ɵContainerStyleCalculationHelper } from '../helpers';

@Directive({
    selector: '[osSelectionZone]'
})
export class SelectionZoneDirective implements OnInit, OnDestroy {
    private get destroyedOrDocumentMouseUp$(): Observable<unknown> {
        return merge(
            this.destroyed$,
            this.globalEvents.fromDocument('mouseup')
        );
    }

    private readonly containerStyleUpdater = new ɵContainerStyleCalculationHelper(
        this.hostRef.nativeElement
    );

    private containerElement: HTMLDivElement;

    private destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly globalEvents: ɵGlobalEvents,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.hostRef.nativeElement.classList.add(CssClass.Zone);
        this.initMouseDownObserver();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    private createContainerElement(): void {
        this.containerElement = this.document.createElement('div');

        this.containerStyleUpdater.setContainerElement(this.containerElement);
        this.containerElement.classList.add(CssClass.Container);
        this.hostRef.nativeElement.appendChild(this.containerElement);
    }

    private removeContainerElement(): void {
        if (this.containerElement) {
            this.hostRef.nativeElement.removeChild(this.containerElement);
            this.containerStyleUpdater.removeContainerElement();

            this.containerElement = null;
        }
    }

    private initMouseDownObserver(): void {
        fromEvent<PointerEvent>(this.hostRef.nativeElement, 'mousedown')
            .pipe(
                filter(({ target }) => (target === this.hostRef.nativeElement)),
                takeUntil(this.destroyed$)
            )
            .subscribe((event) => {
                this.document.body.classList.add(CommonCssClass.UserSelectNone);
                this.removeContainerElement();
                this.createContainerElement();
                this.containerStyleUpdater.setInitialMouseDownEvent(event);
                this.containerStyleUpdater.calculateAll(event);
                this.initMouseMoveObserver();
                this.initMouseUpObserver();
            });
    }

    private initMouseMoveObserver(): void {
        this.globalEvents.fromDocument<PointerEvent>('mousemove')
            .pipe(takeUntil(this.destroyedOrDocumentMouseUp$))
            .subscribe((event) => this.containerStyleUpdater.calculateAll(event));
    }

    private initMouseUpObserver(): void {
        this.globalEvents.fromDocument<PointerEvent>('mouseup')
            .pipe(
                first(),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => {
                this.document.body.classList.remove(CommonCssClass.UserSelectNone);
                this.removeContainerElement();
            });
    }
}
