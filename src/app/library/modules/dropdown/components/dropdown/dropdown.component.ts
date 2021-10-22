import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
    CommonCssClassEnum,
    EventOutside,
    isNil,
    OsBaseFormControlComponent
} from '../../../../core';
import { IS_DYNAMIC_WINDOW_CONTEXT } from '../../../window/data/is-dynamic-window-context.token';
import { DropdownValueChangeEvent } from '../../interfaces';
import { DropdownItemComponent as ItemComponent } from '../dropdown-item';

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
    implements OnInit, ControlValueAccessor {
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

    /** Is dropdown overlay with items opened? */
    public isOverlayOpened: boolean = false;

    /** @internal */
    public get _isListAppendToBody(): boolean {
        return (!isNil(this.isAppendToBody)) ? this.isAppendToBody : !this.isDynamicWindowContext;
    }

    /** @internal */
    public get _isPlaceholderVisible(): boolean {
        return (!isNil(this.placeholder) && (isNil(this.value) || isNil(this.label)));
    }

    /** @internal */
    public get _isValueExist(): boolean {
        return !isNil(this.value);
    }

    /** Dropdown value */
    public value: T;
    /** Dropdown label */
    public label: string;

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
        this.value = value;

        this.changeDetector.markForCheck();
    }

    /** @internal */
    public initSelectedItem(item: ItemComponent<T>): void {
        this.value = item?.data ?? null;
        this.label = item?.getLabel() ?? item?.data?.toString() ?? null;

        this.changeDetector.detectChanges();
    }

    /** @internal */
    public onItemSelect(event: DropdownValueChangeEvent<T>, item: ItemComponent<T>): void {
        this.initSelectedItem(item);
        this.osChange.emit(event);
        this.onChange?.(event.data);
        this.close();
    }

    protected onClick(event: PointerEvent): void {
        super.onClick(event);

        if (!this.isDisabled) {
            this.toggle();
        }
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
