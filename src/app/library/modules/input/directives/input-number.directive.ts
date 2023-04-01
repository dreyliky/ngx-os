import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ɵIsNil } from '../../../core';
import { ɵNumericalValueConverter } from '../helpers';
import { InputNumberChangeEvent } from '../interfaces';

/** Transforms HTML input to input-number in os style */
@Directive({
    selector: 'input[osInputNumber]',
    host: {
        'class': 'os-input os-input-number'
    },
    exportAs: 'osInputNumber',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputNumberDirective,
            multi: true
        }
    ]
})
export class InputNumberDirective implements OnInit, ControlValueAccessor {
    /** Allows decimal numbers */
    @Input()
    public isAllowDecimal: boolean = true;

    /** Allows to display empty field without number when no value */
    @Input()
    public isAllowEmpty: boolean = true;

    /** Minimum allowed number */
    @Input()
    public min: number;

    /** Maximum allowed number */
    @Input()
    public max: number;

    /** Minimum count of fraction digits */
    @Input()
    public minFractionDigits: number;

    /** Maximum count of fraction digits */
    @Input()
    public maxFractionDigits: number;

    /** Fires when the input-number value change */
    @Output()
    public osChange: EventEmitter<InputNumberChangeEvent> = new EventEmitter();

    /** @internal */
    public onChange: (value: number) => void;
    /** @internal */
    public onTouched: () => void;

    private readonly converter = new ɵNumericalValueConverter(this);

    private get inputElement(): HTMLInputElement {
        return this.hostRef.nativeElement;
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLInputElement>
    ) {}

    public ngOnInit(): void {
        this.initDefaultValue();
    }

    @HostListener('input', ['$event'])
    public onHostInput(originalEvent: Event): void {
        const value = this.converter.toValid(this.inputElement.value);
        this.inputElement.value = this.converter.toRaw(this.inputElement.value);

        this.onChange?.(+value);
        this.osChange.emit({ value: +value, originalEvent });
    }

    @HostListener('change', ['$event'])
    public onHostChange(originalEvent: Event): void {
        if (!this.inputElement.value.length) {
            this.inputElement.value = this.getDefaultValue();
        } else {
            this.inputElement.value = this.converter.toValid(this.inputElement.value);
        }

        this.osChange.emit({
            value: +this.inputElement.value,
            originalEvent
        });
    }

    /** @internal */
    public writeValue(value: string | number): void {
        if (ɵIsNil(value)) {
            this.inputElement.value = this.getDefaultValue();
        } else {
            this.inputElement.value = this.converter.toValid(value);
        }
    }

    /** @internal */
    @HostListener('blur')
    public onHostBlur(): void {
        this.onTouched?.();
    }

    /** @internal */
    public registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    /** @internal */
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @internal */
    public setDisabledState(isDisabled: boolean): void {
        this.inputElement.disabled = isDisabled;
    }

    private getDefaultValue(): string {
        return (this.isAllowEmpty) ? '' : '0';
    }

    private initDefaultValue(): void {
        if (!this.inputElement.value) {
            this.inputElement.value = this.getDefaultValue();
        }
    }
}
