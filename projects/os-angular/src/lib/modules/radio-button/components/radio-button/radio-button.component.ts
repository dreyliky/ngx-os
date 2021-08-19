import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from 'os-angular/core';
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
    public label: string;

    @Input()
    public name: string;

    @Input()
    public checked: boolean;

    @Input()
    public value: T;

    @Input()
    public isDisabled: boolean;

    @Output()
    public osChange = new EventEmitter<RadioButtonValueChangeEvent<T>>();

    public onChange: (value: T) => any;
    public onTouched: () => any;

    constructor() {
        super();
    }

    public onRadioButtonChange(event: Event): void {
        this.onChange(this.value);
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
}
