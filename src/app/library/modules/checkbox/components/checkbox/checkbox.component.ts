import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonCssClassEnum, OsBaseFormControlComponent } from '../../../../core';
import { ICheckboxValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent<T>
    extends OsBaseFormControlComponent<boolean>
    implements OnInit, ControlValueAccessor {
    @Input()
    public readonly label: string = '';

    @Input()
    public readonly name: string = '';

    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public readonly isDisabled: boolean;

    @Input()
    public readonly value: T;

    @Output()
    public osChange: EventEmitter<ICheckboxValueChangeEvent<T>> = new EventEmitter();

    /** Emits when `checked` state changed. Might be used for two way binding */
    @Output()
    public isCheckedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('checkbox')
    private readonly checkboxElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-checkbox');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onCheckboxValueChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;
        this.isChecked = inputElement.checked;

        this.onChange?.(this.isChecked);
        this.isCheckedChange.emit(this.isChecked);
        this.osChange.emit({
            originalEvent,
            value: this.value,
            checked: this.isChecked
        });
    }

    public writeValue(value: boolean): void {
        this.isChecked = value;

        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            const currentState = this.checkboxElementRef.nativeElement.checked;
            this.checkboxElementRef.nativeElement.checked = !currentState;

            this.checkboxElementRef.nativeElement.dispatchEvent(new Event('change'));
            this.checkboxElementRef.nativeElement.focus();
            super.onClick(event);
        }
    }
}