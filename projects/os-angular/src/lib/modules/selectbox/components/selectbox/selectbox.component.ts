import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component,
    ContentChildren, ElementRef, EventEmitter, forwardRef,
    HostListener, Input, OnDestroy, Output, QueryList, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from 'os-angular/core';
import { OutsideClick } from 'os-angular/helpers';
import { Subscription } from 'rxjs';
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

    @Output()
    public osChange = new EventEmitter<T>();

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

    @ViewChild('SelectboxElement')
    private readonly selectboxElement: ElementRef<HTMLDivElement>;

    private _optionComponentList: QueryList<OptionComponent<T>>;
    private _optionsSelectedEventSubscriptions: Subscription[];

    constructor(
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

    public trackByFn(optionComponent: OptionComponent<T>, index: number): number {
        return index;
    }

    public registerOnChange(fn: () => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    public writeValue(value: T): void {
        this.value = this.getActualValue(value);

        this.changeDetector.detectChanges();
    }

    public onChange: any = (): any => {};

    public onTouched: any = (): any => {};

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
                .subscribe((value: T) => {
                    this.value = value;

                    this.valueChange.emit(value);
                    this.osChange.emit(value);
                    this.onChange(value);
                });

            this._optionsSelectedEventSubscriptions.push(subscription);
        });
    }

    private unsubscribeFromOptionSelectedEvents(): void {
        this._optionsSelectedEventSubscriptions
            ?.forEach((subscription) => subscription.unsubscribe());
    }

}
