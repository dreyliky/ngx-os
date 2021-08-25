import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from '@lib-core';
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
export class RadioButtonComponent<T> extends OsBaseComponent implements ControlValueAccessor {
    @Input()
    public readonly label = '';

    @Input()
    public readonly name = '';

    @Input()
    @HostBinding('class.checked')
    public checked: boolean;

    @Input()
    public readonly value: T;

    @Input()
    @HostBinding('class.disabled')
    public readonly isDisabled: boolean;

    @Output()
    public osChange = new EventEmitter<RadioButtonValueChangeEvent<T>>();

    @ViewChild('radioElement')
    private readonly radioElementRef: ElementRef<HTMLInputElement>;

    public onChange: (value: T) => any;
    public onTouched: () => any;

    public onRadioButtonChange(event: Event): void {
        this.onChange?.(this.value);
        this.osChange.emit({ event, value: this.value });
    }

    public registerOnChange(fn: () => any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    public writeValue(value: T): void {
        if (value === this.value) {
            this.checked = true;
        }
    }

    protected onClick(event: PointerEvent): void {
        this.radioElementRef.nativeElement.click();

        super.onClick(event);
    }
}
