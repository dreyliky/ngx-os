import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export abstract class OsBaseFormControlComponent<T = any> extends OsBaseComponent implements ControlValueAccessor {
    public onChange: (value: T) => any;
    public onTouched: () => any;

    public registerOnChange(fn: () => any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    public abstract writeValue(value: T): void;
}
