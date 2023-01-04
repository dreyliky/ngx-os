import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
    ɵCommonCssClassEnum,
    ɵEventOutside,
    ɵGlobalEvents,
    ɵIsNil,
    ɵOsBaseFormControlComponent
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
export class DropdownComponent<T = any>
    extends ɵOsBaseFormControlComponent<T>
    implements OnInit, ControlValueAccessor {
    /** Is dropdown disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
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
    public get isOverlayOpened(): boolean {
        return this._isOverlayOpened$.getValue();
    }

    /** @internal */
    public get _isListAppendToBody(): boolean {
        return (!ɵIsNil(this.isAppendToBody)) ? this.isAppendToBody : !this.isDynamicWindowContext;
    }

    /** @internal */
    public get _isPlaceholderVisible(): boolean {
        return (!ɵIsNil(this.placeholder) && (ɵIsNil(this.value) || ɵIsNil(this.label)));
    }

    /** @internal */
    public get _isValueExist(): boolean {
        return !ɵIsNil(this.value);
    }

    /** Dropdown value */
    public value: T;
    /** Dropdown label */
    public label: string;

    private get _viewDestroyedOrOverlayBecomeClosed$(): Observable<boolean> {
        return merge(
            this.viewDestroyed$,
            this._isOverlayOpened$
                .pipe(filter((isOpened) => !isOpened))
        );
    }

    private _isOverlayOpened$ = new BehaviorSubject<boolean>(false);

    constructor(
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) private readonly isDynamicWindowContext: boolean,
        private readonly globalEvents: ɵGlobalEvents
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    /** Opens the dropdown overlay */
    public open(): void {
        this._isOverlayOpened$.next(true);
        this.initClickOutsideObserver();
        this.changeDetector.detectChanges();
    }

    /** Closes the dropdown overlay */
    public close(): void {
        this._isOverlayOpened$.next(false);
        this.onTouched?.();
        this.changeDetector.markForCheck();
    }

    /** Toggle the dropdown overlay open or close */
    public toggle(): void {
        (this.isOverlayOpened) ? this.close() : this.open();
    }

    /** @internal */
    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;

        this.changeDetector.markForCheck();
    }

    /** @internal */
    public _initSelectedItem(item: ItemComponent<T>): void {
        this.value = item?.data ?? null;
        this.label = item?.getLabel();

        this.changeDetector.detectChanges();
    }

    /** @internal */
    public _onItemSelect(event: DropdownValueChangeEvent<T>, item: ItemComponent<T>): void {
        this._initSelectedItem(item);
        this.osChange.emit(event);
        this.onChange?.(event.data);
        this.close();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                filter(() => !this.isDisabled),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.toggle());
    }

    private initClickOutsideObserver(): void {
        this.globalEvents.fromDocument('click')
            .pipe(
                filter((event) => ɵEventOutside.checkForElement(this.hostRef.nativeElement, event)),
                takeUntil(this._viewDestroyedOrOverlayBecomeClosed$)
            )
            .subscribe(() => this.close());
    }
}
