import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
    CommonCssClassEnum,
    EventOutside,
    isNil,
    OsBaseFormControlComponent
} from '../../../../core';
import { IS_DYNAMIC_WINDOW_CONTEXT } from '../../../window/data/is-dynamic-window-context.token';
import { DropdownValueChangeEvent } from '../../interfaces';
import { DropdownItemComponent } from '../dropdown-item';

/**
 * ## Content Projection Slots
 *
 * - Attribute `os-dropdown-header`: Slot for your custom content inside overlay at the top.
 * - Attribute `os-dropdown-content`: Slot for your custom content inside overlay at the middle.
 * - Components `os-dropdown-item`: Slot for `DropdownItemComponent`'s which are will be rendered inside the overlay.
 * - Attribute `os-dropdown-footer`: Slot for your custom content inside overlay at the bottom.
 *
 * @example
 * ```html
 * <os-dropdown>
 *     <div os-dropdown-header>MY HEADER CONTENT</div>
 *     <div os-dropdown-content>MY CONTENT</div>
 *     <os-dropdown-item *ngFor="let item of items"></os-dropdown-item>
 *     <div os-dropdown-footer>MY FOOTER CONTENT</div>
 * </os-dropdown>
 * ```
 *
 * ## Templates
 *
 * `#dropdownPlaceholder`: Custom template which will be rendered instead of the default placeholder.
 *
 * @example
 * ```html
 * <os-dropdown>
 *     <ng-template #dropdownPlaceholder>
 *         <!-- To get default behavior inside your template -->
 *         <span
 *             class="os-placeholder"
 *             [innerText]="'My placeholder text'">
 *         </span>
 *         <!-- OR JUST WRITE YOUR CUSTOM CONTENT -->
 *     </ng-template>
 * </os-dropdown>
 * ```
 *
 * `#dropdownValue`: Custom template which will be rendered instead of the default value.
 *
 * Context:
 * - `$implicit`: {@link T} value from the selected dropdown item;
 *
 * @example
 * ```html
 * <os-dropdown>
 *     <ng-template
 *         #dropdownValue
 *         let-value>
 *         <!-- Variable `value` contains the value from the selected dropdown item. -->
 *         <!-- To get default behavior inside your template: -->
 *         <span
 *             class="os-value"
 *             [innerText]="'My value text'">
 *         </span>
 *         <!-- OR JUST WRITE YOUR CUSTOM CONTENT -->
 *     </ng-template>
 * </os-dropdown>
 * ```
 **/
@Component({
    selector: 'os-dropdown',
    templateUrl: './dropdown.component.html',
    host: {
        'class': 'os-dropdown'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent<T>
    extends OsBaseFormControlComponent<T>
    implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {
    /** Is dropdown disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Is dropdown overlay should be created inside the `body` HTML element? */
    @Input()
    public isAppendToBody: boolean;

    /** Placeholder text of the dropdown */
    @Input()
    public placeholder: string = '';

    /** Stylelist for scroll view component of the dropdown overlay */
    @Input()
    public scrollViewStyle: object = { maxHeight: '250px' };

    /** Classlist for scroll view component of the dropdown overlay */
    @Input()
    public scrollViewStyleClass: string;

    /** Fires when the dropdown value change */
    @Output()
    public osChange: EventEmitter<DropdownValueChangeEvent<T>> = new EventEmitter();

    /** @internal */
    @ContentChild('dropdownPlaceholder')
    public _placeholderTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChild('dropdownValue')
    public _valueTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChildren(DropdownItemComponent)
    public set _itemComponentQueryList(data: QueryList<DropdownItemComponent<T>>) {
        this.itemComponentQueryList = data;

        this.itemsChanged$.next();
        this.initItemComponentsSelectedObserver();
    }

    /** Is dropdown overlay with items opened? */
    public isOverlayOpened: boolean = false;

    /** @internal */
    public get _isListAppendToBody(): boolean {
        return (!isNil(this.isAppendToBody)) ? this.isAppendToBody : !this.isDynamicWindowContext;
    }

    /** @internal */
    public get _isPlaceholderVisible(): boolean {
        return (!isNil(this.placeholder) && (isNil(this._value) || isNil(this._label)));
    }

    /** @internal */
    public get _isValueExist(): boolean {
        return !isNil(this._value);
    }

    /** @internal */
    public get _labelToDisplay(): string {
        return this._label;
    }

    /** @internal */
    public get _valueContext(): T {
        return this._value;
    }

    private _label: string;
    private _value: T;
    private initialValue: T;
    private itemComponentQueryList: QueryList<DropdownItemComponent<T>>;
    private selectedItemComponent: DropdownItemComponent<T>;
    private itemsChanged$ = new Subject();

    constructor(
        @Self() @Optional() controlDir: NgControl,
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) private readonly isDynamicWindowContext: boolean,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initControlDir(controlDir, this);
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
        this.initClickOutsideObserver();
    }

    public ngAfterContentInit(): void {
        // This microtask helps to solve the problem with structural directives that are imposed on elements.
        // Structural directives are always recreating the EmbeddedView.
        queueMicrotask(() => {
            this.initSelectedItemByValue(this.initialValue);
            this.changeDetector.detectChanges();
        });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.itemsChanged$.complete();
    }

    /** Opens the dropdown overlay */
    public open(): void {
        this.isOverlayOpened = true;

        this.changeDetector.detectChanges();
    }

    /** Closes the dropdown overlay */
    public close(): void {
        this.isOverlayOpened = false;

        this.changeDetector.detectChanges();
    }

    /** Toggle the dropdown overlay open or close */
    public toggle(): void {
        (this.isOverlayOpened) ? this.close() : this.open();
    }

    /** @internal */
    public writeValue(value: T): void {
        this.setInitialValue(value);
        this.initSelectedItemByValue(value);
        // This microtask helps to solve the problem with structural directives that are imposed on elements.
        // Structural directives are always recreating the EmbeddedView.
        queueMicrotask(() => this.initSelectedItemByValue(value));
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            super.onClick(event);
            this.toggle();
        }
    }

    private onItemSelected(
        event: DropdownValueChangeEvent<T>,
        itemComponent: DropdownItemComponent<T>
    ): void {
        this.initSelectedItem(itemComponent);
        this.deselectAllItems();
        itemComponent.setSelectedState(true);
        this.osChange.emit(event);
        this.onChange?.(event.data);
        this.close();
    }

    private setInitialValue(value: T): void {
        if (!isNil(value) && !this.initialValue) {
            this.initialValue = value;
        }
    }

    private getItemComponentByData(data: T): DropdownItemComponent<T> {
        return this.itemComponentQueryList
            ?.find((itemComponent) => itemComponent.data === data);
    }

    private deselectAllItems(): void {
        this.itemComponentQueryList
            ?.forEach((itemComponent) => itemComponent.setSelectedState(false));
    }

    private initSelectedItemByValue(data: T): void {
        const itemComponent = this.getItemComponentByData(data);

        this.initSelectedItem(itemComponent);
    }

    private initSelectedItem(item: DropdownItemComponent<T>): void {
        this.selectedItemComponent = item ?? null;

        this.deselectAllItems();
        this.initValue();
        this.initLabel();

        if (this.selectedItemComponent) {
            this.selectedItemComponent.setSelectedState(true);
        }
    }

    private initValueBasedOnSelectedItem(itemComponent: DropdownItemComponent<T>): void {
        if (itemComponent.isSelected) {
            this.initSelectedItem(itemComponent);
        }
    }

    private initLabel(): void {
        const value = this.selectedItemComponent?.data?.toString();
        const rawLabel = this.selectedItemComponent?.getLabel();

        this._label = rawLabel ?? value ?? null;
    }

    private initValue(): void {
        this._value = (this.selectedItemComponent?.data ?? null);
    }

    private initItemComponentsSelectedObserver(): void {
        this.itemComponentQueryList
            .forEach((itemComponent) => {
                this.initItemComponentSelectedStateObserver(itemComponent);
                this.initValueBasedOnSelectedItem(itemComponent);
            });
    }

    private initItemComponentSelectedStateObserver(itemComponent: DropdownItemComponent<T>): void {
        const changesOrDestroyed$ = merge(this.viewDestroyed$, this.itemsChanged$);

        itemComponent.osSelected
            .pipe(takeUntil(changesOrDestroyed$))
            .subscribe((event) => this.onItemSelected(event, itemComponent));
    }

    private initClickOutsideObserver(): void {
        fromEvent(this.document, 'click')
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter((event) => (
                    this.isOverlayOpened &&
                    EventOutside.checkForElement(this.hostRef.nativeElement, event)
                ))
            )
            .subscribe(() => this.close());
    }
}
