import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { fromEvent, takeUntil } from 'rxjs';
import { ɵIsNil, ɵOsBaseFormControlComponent } from '../../../core';
import { ɵNumericalValueConverter } from '../helpers';

@Directive({
    selector: 'input[osInputNumber], textarea[osInputNumber]',
    host: {
        'class': 'os-input os-input-number'
    },
    exportAs: 'osInputNumber'
})
export class InputNumberDirective
    extends ɵOsBaseFormControlComponent
    implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor {
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

    private readonly converter = new ɵNumericalValueConverter(this);

    private get hostElement(): HTMLInputElement {
        return this.hostRef.nativeElement;
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLInputElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.hostElement.value = this.getDefaultValue();
    }

    public ngAfterViewInit(): void {
        this.initChangeEventObserver();
        this.initInputEventObserver();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

    /** @internal */
    public override writeValue(value: string | number): void {
        if (!ɵIsNil(value)) {
            this.hostElement.value = this.converter.toValid(value);
        } else {
            this.hostElement.value = this.getDefaultValue();
        }
    }

    private initInputEventObserver(): void {
        fromEvent(this.hostElement, 'input')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => {
                const inputElement = (event.target as HTMLInputElement);
                const validValue = this.converter.toValid(inputElement.value);
                inputElement.value = this.converter.toRaw(inputElement.value);

                this.onChange?.(+validValue);
            });
    }

    private initChangeEventObserver(): void {
        fromEvent(this.hostElement, 'change')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                if (!this.hostElement.value.length) {
                    this.hostElement.value = this.getDefaultValue();
                }
            });
    }

    private processValueFromSimpleChanges(changes: SimpleChanges): void {
        if (changes.value?.previousValue !== changes.value?.currentValue) {
            this.hostElement.value = this.converter.toValid(changes.value.currentValue);
        }
    }

    private getDefaultValue(): string {
        return (this.isAllowEmpty) ? '' : '0';
    }
}
