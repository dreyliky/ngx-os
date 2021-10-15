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
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CommonCssClassEnum, EventOutside, isNil, OsBaseFormControlComponent } from '../../../../core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ]
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

    /** Value of the dropdown */
    @Input()
    public set value(value: T) {
        this.setInitialValue(value);
        // This microtask helps to solve the problem with structural directives that are imposed on elements.
        // Structural directives are always recreating the EmbeddedView.
        queueMicrotask(() => this.initSelectedOptionByValue(value));
    }

    /** Stylelist for scroll view component of the dropdown overlay */
    @Input()
    public scrollViewStyle: object = { maxHeight: '250px' };

    /** Classlist for scroll view component of the dropdown overlay */
    @Input()
    public scrollViewStyleClass: string;

    /** Fires when the dropdown value change */
    @Output()
    public osChange: EventEmitter<DropdownValueChangeEvent<T>> = new EventEmitter();

    /** Fires when `value` changed. Might be used for two way binding */
    @Output()
    public valueChange: EventEmitter<T> = new EventEmitter();

    /** @internal */
    @ContentChild('dropdownPlaceholder')
    public _placeholderTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChild('dropdownValue')
    public _valueTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChildren(DropdownItemComponent)
    public set _optionComponentQueryList(data: QueryList<DropdownItemComponent<T>>) {
        this.optionComponentQueryList = data;

        this.optionsChanged$.next();
        this.initOptionComponentsSelectedObserver();
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
    public get _valueContext(): string {
        return this._value;
    }

    private _label: string;
    private _value: any;
    private initialValue: T;
    private optionComponentQueryList: QueryList<DropdownItemComponent<T>>;
    private selectedOptionComponent: DropdownItemComponent<T>;
    private optionsChanged$ = new Subject();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) private readonly isDynamicWindowContext: boolean,
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
        this.initClickOutsideObserver();
    }

    public ngAfterContentInit(): void {
        // This microtask helps to solve the problem with structural directives that are imposed on elements.
        // Structural directives are always recreating the EmbeddedView.
        queueMicrotask(() => {
            this.initSelectedOptionByValue(this.initialValue);
            this.changeDetector.detectChanges();
        });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.optionsChanged$.complete();
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
        this.initSelectedOptionByValue(value);
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            super.onClick(event);
            this.toggle();
        }
    }

    private onOptionSelected(event: DropdownValueChangeEvent<T>, optionComponent: DropdownItemComponent<T>): void {
        this.initSelectedOption(optionComponent);
        this.deselectAllOptions();
        optionComponent.setSelectedState(true);
        this.valueChange.emit(event.data);
        this.osChange.emit(event);
        this.onChange?.(event.data);
        this.close();
    }

    private setInitialValue(value: T): void {
        if (!isNil(value) && !this.initialValue) {
            this.initialValue = value;
        }
    }

    private getOptionComponentByData(data: T): DropdownItemComponent<T> {
        return this.optionComponentQueryList
            ?.find((optionComponent) => optionComponent.data === data);
    }

    private deselectAllOptions(): void {
        this.optionComponentQueryList
            ?.forEach((optionComponent) => optionComponent.setSelectedState(false));
    }

    private initSelectedOptionByValue(data: T): void {
        const optionComponent = this.getOptionComponentByData(data);

        this.initSelectedOption(optionComponent);
    }

    private initSelectedOption(option: DropdownItemComponent<T>): void {
        this.selectedOptionComponent = option ?? null;

        this.deselectAllOptions();
        this.initValue();
        this.initLabel();

        if (this.selectedOptionComponent) {
            this.selectedOptionComponent.setSelectedState(true);
        }
    }

    private initValueBasedOnSelectedOption(optionComponent: DropdownItemComponent<T>): void {
        if (optionComponent.isSelected) {
            this.initSelectedOption(optionComponent);
        }
    }

    private initLabel(): void {
        const value = this.selectedOptionComponent?.data as any;
        const rawLabel = this.selectedOptionComponent?.getLabel();

        this._label = rawLabel ?? value ?? null;
    }

    private initValue(): void {
        const value = this.selectedOptionComponent?.data as any;

        this._value = value ?? null;
    }

    private initOptionComponentsSelectedObserver(): void {
        this.optionComponentQueryList
            .forEach((optionComponent) => {
                this.initOptionComponentSelectedStateObserver(optionComponent);
                this.initValueBasedOnSelectedOption(optionComponent);
            });
    }

    private initOptionComponentSelectedStateObserver(optionComponent: DropdownItemComponent<T>): void {
        const changesOrDestroyed$ = merge(this.viewDestroyed$, this.optionsChanged$);

        optionComponent.osSelected
            .pipe(takeUntil(changesOrDestroyed$))
            .subscribe((event) => this.onOptionSelected(event, optionComponent));
    }

    private initClickOutsideObserver(): void {
        const dropdownElement = this.hostElementRef.nativeElement;

        fromEvent(this.document, 'click')
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter(() => this.isOverlayOpened),
                filter((event) => EventOutside.checkForElement(dropdownElement, event))
            )
            .subscribe(() => this.close());
    }
}
