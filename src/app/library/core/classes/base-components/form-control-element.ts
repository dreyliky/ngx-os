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

    protected controlDir: NgControl;

    constructor() {
        super();
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public initControlDir(
        controlDir: NgControl,
        valueAccessor: OsBaseFormControlComponent
    ): void {
        if (controlDir) {
            this.controlDir = controlDir;
            this.controlDir.valueAccessor = valueAccessor;
        }
    }

    public abstract writeValue(value: T): void;
}
