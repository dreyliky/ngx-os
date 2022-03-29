import { DOCUMENT } from '@angular/common';
import {
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { ɵCommonCssClassEnum as CommonCssClass, ɵGlobalEvents } from '../../../core';
import { ɵSelectionCssClassEnum as CssClass } from '../enums';
import { ɵContainerStyleCalculationHelper, ɵItemsSelectorHelper } from '../helpers';
import { SelectionItemDirective } from './selection-item.directive';

@Directive({
    selector: '[osSelectionZone]'
})
export class SelectionZoneDirective implements OnInit, OnDestroy {
    @Output()
    public osSelectionStart = new EventEmitter();

    @Output()
    public osSelectionChange = new EventEmitter();

    @Output()
    public osSelectionEnd = new EventEmitter();

    /** @internal */
    @ContentChildren(SelectionItemDirective, { descendants: true })
    public _selectionItems: QueryList<SelectionItemDirective>;

    /** @internal */
    public get _containerElement(): HTMLDivElement {
        return this.containerElement;
    }

    /** @internal */
    public get _initialMouseDownEvent(): PointerEvent {
        return this.initialMouseDownEvent;
    }

    /** @internal */
    public get _zoneHtmlElement(): HTMLElement {
        return this.hostRef.nativeElement;
    }

    private get destroyedOrDocumentMouseUp$(): Observable<unknown> {
        return merge(
            this.destroyed$,
            this.globalEvents.fromDocument('mouseup')
        );
    }

    private readonly containerStyleUpdater = new ɵContainerStyleCalculationHelper(this);
    private readonly itemsSelector = new ɵItemsSelectorHelper(this);

    private containerElement: HTMLDivElement;
    private initialMouseDownEvent: PointerEvent;

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

        this.containerElement.classList.add(CssClass.Container);
        this.hostRef.nativeElement.appendChild(this.containerElement);
    }

    private removeContainerElement(): void {
        if (this.containerElement) {
            this.hostRef.nativeElement.removeChild(this.containerElement);

            this.containerElement = null;
        }
    }

    private onSelectionStart(event: PointerEvent): void {
        this.initialMouseDownEvent = event;

        this.document.body.classList.add(CommonCssClass.UserSelectNone);
        this.removeContainerElement();
        this.createContainerElement();
        this.containerStyleUpdater.calculateAll(event);
        this.initMouseMoveObserver();
        this.initMouseUpObserver();
        this.osSelectionStart.emit();
    }

    private onSelectionChange(event: PointerEvent): void {
        this.containerStyleUpdater.calculateAll(event);
        this.itemsSelector.processAll();
        this.osSelectionChange.emit();
    }

    private onSelectionEnd(): void {
        this.document.body.classList.remove(CommonCssClass.UserSelectNone);
        this.removeContainerElement();
        this.osSelectionEnd.emit();
    }

    private initMouseDownObserver(): void {
        fromEvent<PointerEvent>(this.hostRef.nativeElement, 'mousedown')
            .pipe(
                filter(({ target }) => (target === this.hostRef.nativeElement)),
                takeUntil(this.destroyed$)
            )
            .subscribe((event) => this.onSelectionStart(event));
    }

    private initMouseMoveObserver(): void {
        this.globalEvents.fromDocument<PointerEvent>('mousemove')
            .pipe(takeUntil(this.destroyedOrDocumentMouseUp$))
            .subscribe((event) => this.onSelectionChange(event));
    }

    private initMouseUpObserver(): void {
        this.globalEvents.fromDocument<PointerEvent>('mouseup')
            .pipe(
                first(),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => this.onSelectionEnd());
    }
}
