import { Component } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { OsBaseComponent } from './component';

/** @internal */
@Component({
    template: ''
})
export abstract class OsBaseFormControlComponent<T = any>
    extends OsBaseComponent implements ControlValueAccessor {
    public onChange: (value: T) => void;
    public onTouched: () => void;

    public get controlValue$(): Observable<T> {
        return this.controlDir?.control.valueChanges
            .pipe(
                startWith(this.controlDir.control.value)
            );
    }

    protected controlDir: NgControl;

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
