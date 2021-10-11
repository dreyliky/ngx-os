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
import { IRadioButtonValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-radio-button',
    templateUrl: './radio-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ]
})
export class RadioButtonComponent<T>
    extends OsBaseFormControlComponent<T>
    implements OnInit, ControlValueAccessor {
    /** Label text near the radio-button */
    @Input()
    public readonly label: string = '';

    /** Name of the radio-button group */
    @Input()
    public readonly name: string = '';

    /** Is radio-button checked? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    /** Is radio-button disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public readonly isDisabled: boolean;

    /** Data of the radio-button */
    @Input()
    public data: T;

    /** Fires when the radio-button state change */
    @Output()
    public osChange: EventEmitter<IRadioButtonValueChangeEvent<T>> = new EventEmitter();

    /** Fires when `checked` state changed. Might be used for two way binding */
    @Output()
    public isCheckedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('radioButton')
    private readonly radioElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-radio-button');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    /** @internal */
    public onRadioButtonChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;

        this.onChange?.(this.data);
        this.isCheckedChange.emit(inputElement.checked);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: inputElement.checked
        });
    }

    /** @internal */
    public writeValue(value: T): void {
        this.isChecked = (this.data === value);

        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        const currentState = this.radioElementRef.nativeElement.checked;

        if (!this.isDisabled && !currentState) {
            this.radioElementRef.nativeElement.checked = true;

            this.radioElementRef.nativeElement.dispatchEvent(new Event('change'));
            this.radioElementRef.nativeElement.focus();
            super.onClick(event);
        }
    }
}
