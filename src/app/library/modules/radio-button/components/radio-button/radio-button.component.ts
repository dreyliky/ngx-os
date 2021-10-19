import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonCssClassEnum, OsBaseFormControlComponent } from '../../../../core';
import { RadioButtonValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-radio-button',
    templateUrl: './radio-button.component.html',
    host: {
        'class': 'os-radio-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
    public osChange: EventEmitter<RadioButtonValueChangeEvent<T>> = new EventEmitter();

    /** Fires when `checked` state changed. Might be used for two way binding */
    @Output()
    public isCheckedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('radioButton')
    private readonly radioElementRef: ElementRef<HTMLInputElement>;

    constructor(
        @Self() @Optional() controlDir: NgControl,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initControlDir(controlDir, this);
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
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
