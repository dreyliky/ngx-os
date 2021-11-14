import { Component } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { OsBaseComponent } from './component';

@Component({
    template: ''
})
export abstract class OsBaseFormControlComponent<T = any>
    extends OsBaseComponent implements ControlValueAccessor {
    /** @internal */
    public onChange: (value: T) => void;
    /** @internal */
    public onTouched: () => void;

    /** @internal */
    public get formControlValue$(): Observable<T> | undefined {
        return this.controlDir?.control?.valueChanges
            .pipe(
                startWith(this.controlDir.control.value)
            );
    }

    protected controlDir: NgControl;

    /** @internal */
    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    /** @internal */
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    protected initControlDir(
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
