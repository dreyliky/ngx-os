import { ChangeDetectorRef, Directive, HostBinding, inject, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ɵCommonCssClassEnum } from '../../enums';
import { ɵOsBaseViewComponent } from './view';

@Directive({})
export abstract class ɵOsBaseFormControlComponent<T = any, OutputT = any>
    extends ɵOsBaseViewComponent
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

    private readonly __cdr = inject(ChangeDetectorRef);

    constructor() {
        super();
        this.initControlDir();
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

        this.__cdr.markForCheck();
    }

    /** @internal */
    public writeValue(value: T): void {
        this.value = value;

        this.__cdr.detectChanges();
    }

    private initControlDir(): void {
        const controlDir = inject(NgControl, { optional: true, self: true });

        // For some strange reason, sometimes injector injects parent's controlDir
        // and this condition helps to filter incorrect controlDir.
        // Our (@Self) controlDir should be without valueAccessor.
        if (controlDir && !controlDir.valueAccessor) {
            this.controlDir = controlDir;
            this.controlDir.valueAccessor = this;
        }
    }
}
