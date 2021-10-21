import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    Self,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { isNil, OsBaseFieldComponent } from '../../../../core';
import { NumberBoxChangeEvent } from '../../interfaces';

// FIXME: Refactor
@Component({
    selector: 'os-number-box',
    templateUrl: './number-box.component.html',
    host: {
        'class': 'os-number-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBoxComponent
    extends OsBaseFieldComponent
    implements OnInit, OnChanges, AfterViewInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

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

    /** Fires when the number-box value change */
    @Output()
    public osChange: EventEmitter<NumberBoxChangeEvent> = new EventEmitter();

    @ViewChild('numberbox')
    private readonly inputRef: ElementRef<HTMLInputElement>;

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    constructor(
        @Self() @Optional() controlDir: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initControlDir(controlDir, this);
    }

    public ngOnInit(): void {
        this.initDefaultValue();
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.inputRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.inputRef.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

    /** @internal */
    public writeValue(value: string | number): void {
        if (typeof(value) === 'number' || typeof(value) === 'string') {
            this.value = this.convertValueToNumericString(value);
        } else {
            this.initDefaultValue();
        }

        this.changeDetector.detectChanges();
    }

    protected onInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        inputElement.value = this.convertValueToValidNumericString(inputElement.value);

        super.onInput(event);
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const value = +this.processValueChange();

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
        this.changeDetector.markForCheck();
    }

    private processValueFromSimpleChanges(changes: SimpleChanges): void {
        if (changes.value?.previousValue !== changes.value?.currentValue) {
            this.value = this.convertValueToNumericString(changes.value.currentValue);
        }
    }

    private processValueChange(): string {
        const inputElement = this.inputRef.nativeElement;
        this.value = this.processMinMaxBoundaries(inputElement.value);
        this.value = this.convertValueToNumericString(this.value);

        if (!this.value.length) {
            this.initDefaultValue();
        }

        inputElement.value = this.value;

        return this.value;
    }

    private processMinMaxBoundaries(newValue: string): string {
        let result = +newValue;

        if (newValue.length) {
            if (!isNil(this.min)) {
                result = (result < this.min) ? this.min : result;
            }

            if (!isNil(this.max)) {
                result = (result > this.max) ? this.max : result;
            }

            return result.toString();
        }

        return newValue;
    }

    private convertValueToValidNumericString(value: string | number): string {
        return value.toString()
            .replace(this.getRegexpWithAllowedSymbols(), '')
            .replace(/(?<!^)-/g, '')
            .replace(/(\..*?)\..*/g, '$1');
    }

    private getRegexpWithAllowedSymbols(): RegExp {
        const dotSymbol = this.isAllowDecimal ? '.' : '';
        const regexpAsString = `[^0-9${dotSymbol}-]`;

        return new RegExp(regexpAsString, 'g');
    }

    private convertValueToNumericString(value: string | number): string {
        const parsedValue = this.convertValueToValidNumericString(value);
        const dotIndex = parsedValue.indexOf('.');
        const fractionDigits = (dotIndex !== -1) ? parsedValue.slice((dotIndex + 1)) : null;

        // eslint-disable-next-line max-len
        if (!isNil(this.minFractionDigits) && !isNil(fractionDigits) && fractionDigits.length < this.minFractionDigits) {
            return parsedValue.slice(0, dotIndex);
        }

        // eslint-disable-next-line max-len
        if (!isNil(this.maxFractionDigits) && !isNil(fractionDigits) && fractionDigits.length > this.maxFractionDigits) {
            return (
                parsedValue.slice(0, (dotIndex + 1)) +
                fractionDigits.slice(0, this.maxFractionDigits)
            );
        }

        return parsedValue;
    }

    private initDefaultValue(): void {
        if (this.isAllowEmpty) {
            this.value = '';
        } else {
            this.value = '0';
        }
    }
}
