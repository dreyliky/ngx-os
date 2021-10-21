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
import { NumericalValueConverter } from '../../helpers/numerical-value-converter.helper';
import { NumberBoxChangeEvent } from '../../interfaces';

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

    private readonly converter = new NumericalValueConverter(this);

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
        if (!isNil(value)) {
            this.value = this.converter.toValid(value);
        } else {
            this.initDefaultValue();
        }

        this.changeDetector.detectChanges();
    }

    protected onInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        inputElement.value = this.converter.toRaw(inputElement.value);

        super.onInput(event);
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const inputElement = this.inputRef.nativeElement;
        this.value = this.converter.toValid(inputElement.value);

        if (!this.value.length) {
            this.initDefaultValue();
        }

        inputElement.value = this.value;

        this.onChange?.(+this.value);
        this.osChange.emit({ originalEvent, value: +this.value });
        this.changeDetector.markForCheck();
    }

    private processValueFromSimpleChanges(changes: SimpleChanges): void {
        if (changes.value?.previousValue !== changes.value?.currentValue) {
            this.value = this.converter.toValid(changes.value.currentValue);
        }
    }

    private initDefaultValue(): void {
        this.value = (this.isAllowEmpty) ? '' : '0';
    }
}
