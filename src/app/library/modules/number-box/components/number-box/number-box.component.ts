import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
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
    extends ɵOsBaseFieldComponent<string, number>
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

    protected override targetInternalElementSelector = 'input';

    private readonly converter = new ɵNumericalValueConverter(this);

    public ngOnInit(): void {
        this.value = this.getDefaultValue();
    }

    public override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initChangeEventObserver();
        this.initInputEventObserver();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

    /** @internal */
    public override writeValue(value: string | number): void {
        if (!ɵIsNil(value)) {
            this.value = this.converter.toValid(value);
        } else {
            this.value = this.getDefaultValue();
        }

        this.changeDetector.detectChanges();
    }

    private transformChangeEvent(originalEvent: Event): NumberBoxChangeEvent {
        const inputElement = originalEvent.target as HTMLInputElement;

        return {
            originalEvent,
            value: +this.converter.toValid(inputElement.value)
        };
    }

    private initInputEventObserver(): void {
        this.osInput
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => {
                const inputElement = event.target as HTMLInputElement;
                const validValue = this.converter.toValid(inputElement.value);
                inputElement.value = this.converter.toRaw(inputElement.value);

                this.onChange?.(+validValue);
                this.changeDetector.markForCheck();
            });
    }

    private initChangeEventObserver(): void {
        this.osChange
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(({ originalEvent, value }) => {
                const inputElement = originalEvent.target as HTMLInputElement;
                this.value = `${value}`;

                if (!this.value.length) {
                    this.value = this.getDefaultValue();
                }

                inputElement.value = this.value;
            });
    }

    private processValueFromSimpleChanges(changes: SimpleChanges): void {
        if (changes.value?.previousValue !== changes.value?.currentValue) {
            this.value = this.converter.toValid(changes.value.currentValue);
        }
    }

    private getDefaultValue(): string {
        return (this.isAllowEmpty) ? '' : '0';
    }
}
