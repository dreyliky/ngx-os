import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonCssClassEnum, EventOutside, isNil, OsBaseFormControlComponent } from '../../../../core';
import { IS_DYNAMIC_WINDOW_CONTEXT } from '../../../window/data/is-dynamic-window-context.token';
import { IDropdownValueChangeEvent } from '../../interfaces';
import { DropdownItemComponent } from '../dropdown-item';

@Component({
    selector: 'os-dropdown',
    templateUrl: './dropdown.component.html',
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
    implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    /** Is dropdown overlay with items opened? */
    @Input()
    public isOpened: boolean = false;

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
        this.initSelectedOptionByValue(value);
    }

    /** Stylelist for scroll view component of the dropdown overlay */
    @Input()
    public scrollViewStyle: object = { maxHeight: '250px' };

    /** Classlist for scroll view component of the dropdown overlay */
    @Input()
    public scrollViewStyleClass: string;

    /** Fires when the dropdown value change */
    @Output()
    public osChange: EventEmitter<IDropdownValueChangeEvent<T>> = new EventEmitter();

    /** Fires when `value` changed. Might be used for two way binding */
    @Output()
    public valueChange: EventEmitter<T> = new EventEmitter();

    /** @internal */
    @ContentChildren(DropdownItemComponent)
    public set _optionComponentQueryList(data: QueryList<DropdownItemComponent<T>>) {
        this.optionComponentQueryList = data;

        this.initOptionComponentsSelectedObserver();
    }

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

    private _label: string;
    private _value: any;
    private initialValue: T;
    private optionComponentQueryList: QueryList<DropdownItemComponent<T>>;
    private selectedOptionComponent: DropdownItemComponent<T>;
    private optionSubscriptions: Subscription[];

    constructor(
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) private readonly isDynamicWindowContext: boolean,
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-dropdown');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterViewInit(): void {
        this.initSelectedOptionByValue(this.initialValue);
        this.changeDetector.detectChanges();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.unsubscribeFromOptionSubscriptions();
    }

    /** @internal */
    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        if (this.isOpened) {
            const dropdownElement = this.hostElementRef.nativeElement;
            const isEventOutside = EventOutside.checkForElement(dropdownElement, event);
            this.isOpened = !isEventOutside;
        }
    }

    /** @internal */
    public writeValue(value: T): void {
        this.setInitialValue(value);
        this.initSelectedOptionByValue(value);
        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            this.isOpened = !this.isOpened;

            super.onClick(event);
            this.changeDetector.detectChanges();
        }
    }

    private setInitialValue(value: T): void {
        if (!isNil(value) && !this.initialValue) {
            this.initialValue = value;
        }
    }

    private getOptionComponentByValue(value: T): DropdownItemComponent<T> {
        return this.optionComponentQueryList
            ?.find((optionComponent) => optionComponent.value === value);
    }

    private deselectAllOptions(): void {
        this.optionComponentQueryList
            ?.forEach((optionComponent) => optionComponent.setSelectedState(false));
    }

    private initSelectedOptionByValue(value: T): void {
        const optionComponent = this.getOptionComponentByValue(value);

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

    private initOptionComponentsSelectedObserver(): void {
        this.unsubscribeFromOptionSubscriptions();

        this.optionSubscriptions = [];

        this.optionComponentQueryList
            .forEach((optionComponent) => {
                this.initOptionComponentSelectedStateObserver(optionComponent);
                this.initValueBasedOnSelectedOption(optionComponent);
            });
    }

    private initOptionComponentSelectedStateObserver(optionComponent: DropdownItemComponent<T>): void {
        const subscription = optionComponent.osSelected
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => {
                this.initSelectedOption(optionComponent);
                this.deselectAllOptions();
                optionComponent.setSelectedState(true);
                this.valueChange.emit(event.value);
                this.osChange.emit(event);
                this.onChange?.(event.value);
                this.changeDetector.detectChanges();
            });

        this.optionSubscriptions.push(subscription);
    }

    private initValueBasedOnSelectedOption(optionComponent: DropdownItemComponent<T>): void {
        if (optionComponent.isSelected) {
            this.initSelectedOption(optionComponent);
        }
    }

    private initLabel(): void {
        const value = this.selectedOptionComponent?.value as any;
        const rawLabel = this.selectedOptionComponent?.getLabel();

        this._label = rawLabel ?? value ?? null;
    }

    private initValue(): void {
        const value = this.selectedOptionComponent?.value as any;

        this._value = value ?? null;
    }

    private unsubscribeFromOptionSubscriptions(): void {
        this.optionSubscriptions
            ?.forEach((subscription) => subscription.unsubscribe());
    }
}
