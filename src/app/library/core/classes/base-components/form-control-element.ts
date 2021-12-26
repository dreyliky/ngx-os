import { Component, InjectFlags, Injector } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ɵOsBaseComponent } from './component';

@Component({
    template: ''
})
export abstract class ɵOsBaseFormControlComponent<T = any>
    extends ɵOsBaseComponent
    implements ControlValueAccessor {
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

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.initControlDir(injector);
    }

    /** @internal */
    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    /** @internal */
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    private initControlDir(injector: Injector): void {
        const controlDir = injector.get(NgControl, null, InjectFlags.Self);

        // For some strange reason, sometimes injector injects parent's controlDir
        // and this condition helps to filter incorrect controlDir.
        // Our (@Self) controlDir should be without valueAccessor.
        if (controlDir && !controlDir.valueAccessor) {
            this.controlDir = controlDir;
            this.controlDir.valueAccessor = this;
        }
    }

    public abstract writeValue(value: T): void;
}
