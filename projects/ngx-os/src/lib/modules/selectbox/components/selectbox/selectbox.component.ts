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
import { IS_DYNAMIC_WINDOW_CONTEXT, OsBaseFormControlComponent } from '@lib-core';
import { EventOutside, isNil } from '@lib-helpers';
import { Subscription } from 'rxjs';
import { SelectboxValueChangeEvent } from '../../interfaces';
import { OptionComponent } from '../option';

@Component({
    selector: 'os-selectbox',
    templateUrl: './selectbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectboxComponent),
            multi: true
        }
    ]
})
export class SelectboxComponent<T>
    extends OsBaseFormControlComponent<T>
    implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input()
    public isOpened: boolean = false;

    @Input()
    @HostBinding('class.os-disabled')
    public isDisabled: boolean = false;

    @Input()
    public isAppendToBody: boolean;

    @Input()
    public placeholder: string = '';

    @Input()
    public set value(value: T) {
        this.setInitialValue(value);
        this.initSelectedOptionByValue(value);
    }

    @Input()
    public displayField: keyof T;

    @Input()
    public valueField: keyof T;

    @Input()
    public scrollViewStyle: object = { maxHeight: '250px' };

    @Input()
    public scrollViewStyleClass: string;

    @Output()
    public osChange: EventEmitter<SelectboxValueChangeEvent<T>> = new EventEmitter();

    @Output()
    public valueChange: EventEmitter<T> = new EventEmitter();

    @ContentChildren(OptionComponent)
    public set _optionComponentQueryList(data: QueryList<OptionComponent<T>>) {
        this.optionComponentQueryList = data;

        this.initOptionComponentsSelectedObserver();
    }

    public get _isListAppendToBody(): boolean {
        return (!isNil(this.isAppendToBody)) ? this.isAppendToBody : !this.isDynamicWindowContext;
    }

    public get _isPlaceholderVisible(): boolean {
        return (!isNil(this.placeholder) && (isNil(this._value) || isNil(this._label)));
    }

    public get _isValueExist(): boolean {
        return !isNil(this._value);
    }

    public get _labelToDisplay(): string {
        return this._label;
    }

    private get _value(): any {
        const rawValue = this.selectedOptionComponent?.value as any;

        return (this.valueField) ? rawValue?.[this.valueField] : rawValue;
    }

    private get _label(): string {
        const rawValue = this.selectedOptionComponent?.value as any;
        const rawLabel = this.selectedOptionComponent?.getLabel();

        return (this.displayField) ? rawValue?.[this.displayField] : (rawLabel ?? rawValue);
    }

    private initialValue: T;
    private optionComponentQueryList: QueryList<OptionComponent<T>>;
    private selectedOptionComponent: OptionComponent<T>;
    private subscriptions: Subscription[];

    constructor(
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) private readonly isDynamicWindowContext: boolean,
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-selectbox');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterViewInit(): void {
        this.initSelectedOptionByValue(this.initialValue);
        this.changeDetector.detectChanges();
    }

    public ngOnDestroy(): void {
        this.unsubscribeFromSubscriptions();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        if (this.isOpened) {
            const selectboxElement = this.hostElementRef.nativeElement;
            const isEventOutside = EventOutside.checkForElement(selectboxElement, event);
            this.isOpened = !isEventOutside;
        }
    }

    public writeValue(value: T): void {
        this.setInitialValue(value);
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

    private getOptionComponentByValue(value: T): OptionComponent<T> {
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

    private initSelectedOption(option: OptionComponent<T>): void {
        this.selectedOptionComponent = option ?? null;

        this.deselectAllOptions();

        if (this.selectedOptionComponent) {
            this.selectedOptionComponent.setSelectedState(true);
        }
    }

    private initOptionComponentsSelectedObserver(): void {
        this.unsubscribeFromSubscriptions();

        this.optionComponentQueryList
            .forEach((optionComponent) => {
                this.initOptionComponentSelectedStateObserver(optionComponent);
                this.initValueBasedOnSelectedOption(optionComponent);
            });
    }

    private initOptionComponentSelectedStateObserver(optionComponent: OptionComponent<T>): void {
        const subscription = optionComponent.osSelected
            .subscribe((event: SelectboxValueChangeEvent<T>) => {
                this.initSelectedOption(optionComponent);
                this.deselectAllOptions();
                optionComponent.setSelectedState(true);
                this.valueChange.emit(event.value);
                this.osChange.emit(event);
                this.onChange?.(event.value);
                console.log(this._value, this._label, this.placeholder, this._isPlaceholderVisible);
                this.changeDetector.detectChanges();
            });

        this.subscriptions.push(subscription);
    }

    private initValueBasedOnSelectedOption(optionComponent: OptionComponent<T>): void {
        if (optionComponent.isSelected) {
            this.initSelectedOption(optionComponent);
        }
    }

    private unsubscribeFromSubscriptions(): void {
        this.subscriptions
            ?.forEach((subscription) => subscription.unsubscribe());

        this.subscriptions = [];
    }
}
