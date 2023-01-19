import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ɵIsNil, ɵOsBaseFormControlComponent } from '../../../../core';
import { InputDirective } from '../../directives';
import { ɵNumericalValueConverter } from '../../helpers/numerical-value-converter.helper';
import { InputNumberChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-input-number',
    template: '<ng-content select="input"></ng-content>',
    host: {
        'class': 'os-input-number'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberComponent
    extends ɵOsBaseFormControlComponent<string, number>
    implements OnChanges, AfterContentInit {
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

    /** Fires when the input-number value change */
    @Output()
    public osChange: EventEmitter<InputNumberChangeEvent> = new EventEmitter();

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    protected targetInternalElementSelector = 'input';

    @ContentChild(InputDirective, { read: ElementRef })
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    private readonly converter = new ɵNumericalValueConverter(this);

    private get inputElement(): HTMLInputElement {
        return this.inputElementRef.nativeElement;
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterContentInit(): void {
        this.throwErrorIfInputNotFound();

        this.value = this.getInitialValue();
        this.inputElement.value = this.value;

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

    private transformChangeEvent(originalEvent: Event): InputNumberChangeEvent {
        return {
            originalEvent,
            value: +this.value
        };
    }

    private initInputEventObserver(): void {
        fromEvent(this.inputElementRef.nativeElement, 'input')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.value = this.converter.toValid(this.inputElement.value);
                this.inputElement.value = this.converter.toRaw(this.inputElement.value);

                this.onChange?.(+this.value);
                this.changeDetector.markForCheck();
            });
    }

    private initChangeEventObserver(): void {
        fromEvent(this.inputElement, 'change')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => {
                if (!this.value.length) {
                    this.value = this.getDefaultValue();
                }

                this.inputElement.value = this.value;

                this.osChange.emit(this.transformChangeEvent(event));
            });
    }

    private processValueFromSimpleChanges({ value }: SimpleChanges): void {
        if (value?.previousValue !== value?.currentValue) {
            this.value = this.converter.toValid(value.currentValue);
        }
    }

    private getInitialValue(): string {
        if (this.inputElement.value) {
            return this.converter.toRaw(this.inputElement.value);
        }

        return this.getDefaultValue();
    }

    private getDefaultValue(): string {
        return (this.isAllowEmpty) ? '' : '0';
    }

    private throwErrorIfInputNotFound(): void {
        if (!this.inputElementRef?.nativeElement) {
            throw new Error(
                `os-input-number component can't ` +
                `find input element with 'osInput' directive.`
            );
        }
    }
}
