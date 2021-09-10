import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFormControlComponent } from '@lib-core';
import { OutsideClick } from '@lib-helpers';
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
    implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    public isOpened: boolean = false;

    @Input()
    @HostBinding('class.disabled')
    public isDisabled: boolean = false;

    @Input()
    public placeholder: string = '';

    @Input()
    public value: T;

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

    private optionComponentQueryList: QueryList<OptionComponent<T>>;
    private parentSubscription = new Subscription();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-selectbox');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngOnDestroy(): void {
        this.parentSubscription.unsubscribe();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        if (this.isOpened) {
            const selectboxElement = this.hostElementRef.nativeElement;
            const isClickOutside = OutsideClick.checkForElement(selectboxElement, event);

            if (isClickOutside) {
                this.isOpened = false;
            }
        }
    }

    public writeValue(value: T): void {
        this.value = this.getRealValue(value);

        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            this.isOpened = !this.isOpened;

            super.onClick(event);
            this.changeDetector.detectChanges();
        }
    }

    private getRealValue(value: T): any {
        return (this.valueField) ? value[this.valueField] : value;
    }

    private initOptionComponentsSelectedObserver(): void {
        this.parentSubscription.unsubscribe();
        this.parentSubscription = new Subscription();

        this.optionComponentQueryList
            .forEach((optionComponent) => this.initOptionComponentSelectedStateObserver(optionComponent));
    }

    private deselectAllOptions(): void {
        this.optionComponentQueryList
            .forEach((optionComponent) => optionComponent.setSelectedState(false));
    }

    private initOptionComponentSelectedStateObserver(optionComponent: OptionComponent<T>): void {
        const subscription = optionComponent.osSelected
            .subscribe((event: SelectboxValueChangeEvent<T>) => {
                this.value = event.value;

                this.deselectAllOptions();
                optionComponent.setSelectedState(true);
                this.valueChange.emit(event.value);
                this.osChange.emit(event);
                this.onChange?.(event.value);
                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }
}
