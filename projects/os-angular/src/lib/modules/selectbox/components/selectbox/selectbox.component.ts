import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
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
import { OptionSelectedEvent } from '../../interfaces';
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
    public osChange: EventEmitter<OptionSelectedEvent<T>> = new EventEmitter();

    @Output()
    public valueChange: EventEmitter<T> = new EventEmitter();

    @ContentChildren(OptionComponent)
    public set optionComponentList(data: QueryList<OptionComponent<T>>) {
        this._optionComponentList = data;

        this.initSelectboxOptions(data);
    }

    public get optionComponentList(): QueryList<OptionComponent<T>> {
        return this._optionComponentList;
    }

    private _optionComponentList: QueryList<OptionComponent<T>>;
    private _optionsSelectedEventSubscriptions: Subscription[];

    constructor(
        private readonly hostElementRef: ElementRef,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-selectbox');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngOnDestroy(): void {
        this.unsubscribeFromOptionSelectedEvents();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        if (this.isOpened) {
            const selectboxElem = this.hostElementRef.nativeElement;
            const isClickOutsideWindow = OutsideClick.checkForElement(selectboxElem, event);

            if (isClickOutsideWindow) {
                this.isOpened = false;
            }
        }
    }

    public trackByFn(_: OptionComponent<T>, index: number): number {
        return index;
    }

    public writeValue(value: T): void {
        this.value = this.getActualValue(value);

        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        this.isOpened = !this.isOpened;

        super.onClick(event);
        this.changeDetector.detectChanges();
    }

    private getActualValue(value: T): any {
        return (this.valueField) ? value[this.valueField] : value;
    }

    private initSelectboxOptions(options: QueryList<OptionComponent<T>>): void {
        this.initOptionsSelectedObserver(options);
    }

    private initOptionsSelectedObserver(optionComponents: QueryList<OptionComponent<T>>): void {
        this.unsubscribeFromOptionSelectedEvents();
        this._optionsSelectedEventSubscriptions = [];

        optionComponents.forEach((optionComponent) => {
            const subscription = optionComponent.osSelected
                .subscribe((event: OptionSelectedEvent<T>) => {
                    this.value = event.value;

                    this.valueChange.emit(event.value);
                    this.osChange.emit(event);
                    this.onChange?.(event.value);
                });

            this._optionsSelectedEventSubscriptions.push(subscription);
        });
    }

    private unsubscribeFromOptionSelectedEvents(): void {
        this._optionsSelectedEventSubscriptions
            ?.forEach((subscription) => subscription.unsubscribe());
    }
}
