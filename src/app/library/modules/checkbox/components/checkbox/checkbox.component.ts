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
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonCssClassEnum, OsBaseFormControlComponent } from '../../../../core';
import { CheckboxValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-checkbox',
    templateUrl: './checkbox.component.html',
    host: {
        'class': 'os-checkbox'
    },
    encapsulation: ViewEncapsulation.None,
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
    /** Label text near the checkbox */
    @Input()
    public readonly label: string = '';

    /** Name of the checkbox group */
    @Input()
    public readonly name: string = '';

    /** Is checkbox checked? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    /** Is checkbox disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public readonly isDisabled: boolean;

    /** Data of the checkbox */
    @Input()
    public readonly data: T;

    /** Fires when the checkbox state change */
    @Output()
    public osChange: EventEmitter<CheckboxValueChangeEvent<T>> = new EventEmitter();

    /** Fires when `checked` state changed. Might be used for two way binding */
    @Output()
    public isCheckedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('checkbox')
    private readonly checkboxElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    public onCheckboxValueChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;
        this.isChecked = inputElement.checked;

        this.onChange?.(this.isChecked);
        this.isCheckedChange.emit(this.isChecked);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: this.isChecked
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
