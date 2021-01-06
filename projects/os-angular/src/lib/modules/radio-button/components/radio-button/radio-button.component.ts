import {
    ChangeDetectionStrategy, Component, forwardRef, Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from 'os-angular/core';

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

    constructor() {
        super();
    }

    public onRadioButtonChange(): void {
        console.log(this.value);
        this.onChange(this.value);
    }

    public registerOnChange(fn: () => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    public writeValue(value: T): void {
        if (value === this.value) {
            this.checked = true;
        }
    }

    public onChange: any = (): any => {};

    public onTouched: any = (): any => {};

}
