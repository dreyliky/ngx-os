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
import { OsBaseFormControlComponent } from '@lib-core';
import { RadioButtonValueChangeEvent } from '../../interfaces';

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
    @Input()
    public readonly label: string = '';

    @Input()
    public readonly name: string = '';

    @Input()
    @HostBinding('class.os-checked')
    public isChecked: boolean;

    @Input()
    @HostBinding('class.os-disabled')
    public readonly isDisabled: boolean;

    @Input()
    public value: T;

    @Output()
    public osChange: EventEmitter<RadioButtonValueChangeEvent<T>> = new EventEmitter();

    /** Emits when `checked` state changed. Might be used for two way binding */
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
        this.classlistManager.add('os-radio-button');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onRadioButtonChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;

        this.onChange?.(this.value);
        this.isCheckedChange.emit(inputElement.checked);
        this.osChange.emit({
            originalEvent,
            value: this.value,
            checked: inputElement.checked
        });
    }

    public writeValue(value: T): void {
        this.isChecked = (this.value === value);

        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            const currentState = this.radioElementRef.nativeElement.checked;
            this.radioElementRef.nativeElement.checked = !currentState;

            this.radioElementRef.nativeElement.dispatchEvent(new Event('change'));
            this.radioElementRef.nativeElement.focus();
            super.onClick(event);
        }
    }
}
