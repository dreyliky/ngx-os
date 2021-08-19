/* eslint-disable @angular-eslint/no-host-metadata-property */
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
    Output,
    QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from 'os-angular/core';
import { OutsideClick } from 'os-angular/helpers';
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
    ],
    host: {
        class: 'os-element os-selectbox',
        '[class]': 'styleClass',
        '[style]': 'style',
        '[id]': 'id',
        '(click)': 'onSelectboxClick($event)',
        '(dblclick)': 'osDblclick.emit($event)',
        '(mousedown)': 'osMousedown.emit($event)',
        '(mousemove)': 'osMousemove.emit($event)',
        '(mouseout)': 'osMouseout.emit($event)',
        '(mouseover)': 'osMouseover.emit($event)',
        '(mouseup)': 'osMouseup.emit($event)',
        '(wheel)': 'osWheel.emit($event)'
    }
})
export class SelectboxComponent<T>
    extends OsBaseComponent implements OnDestroy, ControlValueAccessor {
    @Input()
    public isOpened: boolean = false;

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public placeholder: string = '';

    @Input()
    public value: any;

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
    public valueChange = new EventEmitter<T>();

    public get optionComponentList(): QueryList<OptionComponent<T>> {
        return this._optionComponentList;
    }

    @ContentChildren(OptionComponent)
    public set optionComponentList(data: QueryList<OptionComponent<T>>) {
        this._optionComponentList = data;

        this.initSelectboxOptions(data);
    }

    public onChange: (value: T) => any;
    public onTouched: () => any;

    private _optionComponentList: QueryList<OptionComponent<T>>;
    private _optionsSelectedEventSubscriptions: Subscription[];

    constructor(
        private readonly selectboxElement: ElementRef,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this.unsubscribeFromOptionSelectedEvents();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        if (this.isOpened) {
            const selectboxElem = this.selectboxElement.nativeElement;
            const isClickOutsideWindow = OutsideClick.checkForElement(selectboxElem, event);

            if (isClickOutsideWindow) {
                this.isOpened = false;
            }
        }
    }

    public onSelectboxClick(event: MouseEvent): void {
        this.isOpened = !this.isOpened;

        this.osClick.emit(event);
    }

    public trackByFn(_: OptionComponent<T>, index: number): number {
        return index;
    }

    public registerOnChange(fn: () => any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    public writeValue(value: T): void {
        this.value = this.getActualValue(value);

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
