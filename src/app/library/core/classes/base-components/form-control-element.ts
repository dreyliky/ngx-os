import { Component, HostBinding, InjectFlags, Injector, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ɵCommonCssClassEnum } from '../../enums';
import { ɵOsBaseComponent } from './component';

@Component({
    template: ''
})
export abstract class ɵOsBaseFormControlComponent<T = any, OutputT = any>
    extends ɵOsBaseComponent
    implements ControlValueAccessor {
    /** Is component disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** @internal */
    public onChange: (value: OutputT) => void;
    /** @internal */
    public onTouched: () => void;

    /** Value of the control */
    public value: T = null;

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

    public setDisabledState(state: boolean): void {
        this.isDisabled = state;

        this.changeDetector.markForCheck();
    }

    /** @internal */
    public writeValue(value: T): void {
        this.value = value;

        this.changeDetector.detectChanges();
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
}
