import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ɵIsNil, ɵOsBaseFieldComponent } from '../../../../core';
import { ɵNumericalValueConverter } from '../../helpers/numerical-value-converter.helper';
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
    extends ɵOsBaseFieldComponent
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
    public osChange: Observable<NumberBoxChangeEvent> = this.createEvent('change')
        .pipe(
            map((event) => this.transformChangeEvent(event))
        );

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    protected targetInternalElementSelector = 'input';

    private readonly converter = new ɵNumericalValueConverter(this);

    constructor(
        injector: Injector,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initDefaultValue();
        this.initValueChangeObserver();
    }

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initInputObserver();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

    /** @internal */
    public writeValue(value: string | number): void {
        if (!ɵIsNil(value)) {
            this.value = this.converter.toValid(value);
        } else {
            this.initDefaultValue();
        }

        this.changeDetector.detectChanges();
    }

    private transformChangeEvent(originalEvent: Event): NumberBoxChangeEvent {
        const inputElement = originalEvent.target as HTMLInputElement;
        this.value = this.converter.toValid(inputElement.value);

        if (!this.value.length) {
            this.initDefaultValue();
        }

        inputElement.value = this.value;

        return { originalEvent, value: +this.value };
    }

    private initValueChangeObserver(): void {
        this.osChange
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(({ value }) => {
                this.onChange?.(value);
                this.changeDetector.markForCheck();
            });
    }

    private initInputObserver(): void {
        this.osInput
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => {
                const inputElement = event.target as HTMLInputElement;
                inputElement.value = this.converter.toRaw(inputElement.value);
            });
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
