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
import { filter, first, takeUntil, tap } from 'rxjs/operators';
import { ɵCommonCssClassEnum as CommonCssClass, ɵGlobalEvents } from '../../../core';
import { ɵSelectionCssClassEnum as CssClass } from '../enums';
import { ɵContainerStyleCalculationHelper, ɵItemsSelectorHelper } from '../helpers';
import { SelectionInfo } from '../interfaces';
import { SelectionItemDirective } from './selection-item.directive';

@Directive({
    selector: '[osSelectionZone]'
})
export class SelectionZoneDirective<T = any> implements OnInit, OnDestroy {
    @Output()
    public osSelectionStart: EventEmitter<SelectionInfo> = new EventEmitter();

    @Output()
    public osSelectionChange: EventEmitter<SelectionInfo> = new EventEmitter();

    @Output()
    public osSelectionEnd: EventEmitter<SelectionInfo> = new EventEmitter();

    @Output()
    public osItemsSelectionChange: EventEmitter<T[]> = new EventEmitter();

    /** @internal */
    @ContentChildren(SelectionItemDirective, { descendants: true })
    public _selectionItems: QueryList<SelectionItemDirective>;

    /** @internal */
    public get _containerElement(): HTMLDivElement {
        return this.containerElement;
    }

    /** @internal */
    public get _initialPointerDownEvent(): PointerEvent | TouchEvent {
        return this.initialPointerDownEvent;
    }

    /** @internal */
    public get _zoneHtmlElement(): HTMLElement {
        return this.hostRef.nativeElement;
    }

    private get destroyedOrDocumentPointerUp$(): Observable<unknown> {
        return merge(
            this.destroyed$,
            this.globalEvents.fromDocument('mouseup'),
            this.globalEvents.fromDocument('touchend')
        );
    }

    private readonly containerStyleUpdater = new ɵContainerStyleCalculationHelper(this);
    private readonly itemsSelector = new ɵItemsSelectorHelper<T>(this);

    private containerElement: HTMLDivElement;
    private initialPointerDownEvent: PointerEvent | TouchEvent;

    private destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly globalEvents: ɵGlobalEvents,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.hostRef.nativeElement.classList.add(CssClass.Zone);
        this.initPointerDownObserver();
        this.initSelectedItemsEventObserver();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.itemsSelector.onDestroy();
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

    private onSelectionStart(event: PointerEvent | TouchEvent): void {
        const selectionInfo = this.getSelectionInfo(event);
        this.initialPointerDownEvent = event;

        this.document.body.classList.add(CommonCssClass.UserSelectNone);
        this.removeContainerElement();
        this.createContainerElement();
        this.containerStyleUpdater.calculateAll(event);
        this.initPointerMoveObserver();
        this.initPointerUpObserver();
        this.osSelectionStart.emit(selectionInfo);
    }

    private onSelectionChange(event: PointerEvent | TouchEvent): void {
        const selectionInfo = this.getSelectionInfo(event);

        this.containerStyleUpdater.calculateAll(event);
        this.itemsSelector.onSelection();
        this.osSelectionChange.emit(selectionInfo);
    }

    private onSelectionEnd(event: PointerEvent | TouchEvent): void {
        const selectionInfo = this.getSelectionInfo(event);

        this.document.body.classList.remove(CommonCssClass.UserSelectNone);
        this.removeContainerElement();
        this.osSelectionEnd.emit(selectionInfo);
    }

    private initPointerDownObserver(): void {
        merge(
            fromEvent<PointerEvent>(this.hostRef.nativeElement, 'mousedown'),
            fromEvent<TouchEvent>(this.hostRef.nativeElement, 'touchstart')
        )
            .pipe(
                tap(() => this.itemsSelector.onDeselection()),
                filter(({ target }) => (target === this.hostRef.nativeElement)),
                takeUntil(this.destroyed$)
            )
            .subscribe((event) => this.onSelectionStart(event));
    }

    private initPointerMoveObserver(): void {
        merge(
            this.globalEvents.fromDocument<PointerEvent>('mousemove'),
            this.globalEvents.fromDocument<TouchEvent>('touchmove', { passive: false })
        )
            .pipe(takeUntil(this.destroyedOrDocumentPointerUp$))
            .subscribe((event) => this.onSelectionChange(event));
    }

    private initPointerUpObserver(): void {
        merge(
            this.globalEvents.fromDocument<PointerEvent>('mouseup'),
            this.globalEvents.fromDocument<TouchEvent>('touchend')
        )
            .pipe(
                first(),
                takeUntil(this.destroyed$)
            )
            .subscribe((event) => this.onSelectionEnd(event));
    }

    private initSelectedItemsEventObserver(): void {
        this.itemsSelector.selectedItems$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((items) => this.osItemsSelectionChange.emit(items));
    }

    private getSelectionInfo(originalEvent: PointerEvent | TouchEvent): SelectionInfo {
        return {
            originalEvent
        };
    }
}
