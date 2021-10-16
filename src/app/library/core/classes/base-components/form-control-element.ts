import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { OsBaseComponent } from './component';

/** @internal */
@Component({
    template: ''
})
export abstract class OsBaseFormControlComponent<T = any>
    extends OsBaseComponent implements ControlValueAccessor {
    public onChange: (value: T) => void;
    public onTouched: () => void;

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public abstract writeValue(value: T): void;
}
