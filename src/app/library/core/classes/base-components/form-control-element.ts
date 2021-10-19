import { Component } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { OsBaseComponent } from './component';

/** @internal */
@Component({
    template: ''
})
export abstract class OsBaseFormControlComponent<T = any>
    extends OsBaseComponent implements ControlValueAccessor {
    public onChange: (value: T) => void;
    public onTouched: () => void;

    protected abstract readonly controlDir: NgControl;

    constructor() {
        super();
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public initValueAccessor(valueAccessor: OsBaseFormControlComponent): void {
        if (this.controlDir) {
            this.controlDir.valueAccessor = valueAccessor;
        }
    }

    public setValidityState(state: boolean): void {
        if (state) {
            this.controlDir?.control.setErrors({ invalid: true });
        } else {
            this.controlDir?.control.setErrors(null);
        }
    }

    public abstract writeValue(value: T): void;
}
