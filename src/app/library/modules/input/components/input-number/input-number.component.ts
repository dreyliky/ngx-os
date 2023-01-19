import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DoCheck,
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
    implements OnChanges, AfterContentInit, DoCheck {
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

    public ngDoCheck(): void {
        if (this.inputElementRef?.nativeElement) {
            this.updateInputBindings();
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

    public ngAfterContentInit(): void {
        this.throwErrorIfInputNotFound();
        this.initValue();
        this.initChangeEventObserver();
        this.initInputEventObserver();
        this.updateInputBindings();
    }

    /** @internal */
    public override writeValue(value: string | number): void {
        if (ɵIsNil(value)) {
            this.value = this.getDefaultValue();
        } else {
            this.value = this.converter.toValid(value);
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
                const validValue = this.converter.toValid(this.inputElement.value);
                this.value = this.converter.toRaw(this.inputElement.value);

                this.onChange?.(+validValue);
                this.changeDetector.markForCheck();
            });
    }

    private initChangeEventObserver(): void {
        fromEvent(this.inputElement, 'change')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => {
                if (!this.value.length) {
                    this.value = this.getDefaultValue();
                } else {
                    this.value = this.converter.toValid(this.inputElement.value);
                }

                this.osChange.emit(this.transformChangeEvent(event));
                this.changeDetector.markForCheck();
            });
    }

    private processValueFromSimpleChanges({ value }: SimpleChanges): void {
        if (value?.previousValue !== value?.currentValue) {
            this.value = this.converter.toValid(value.currentValue);
        }
    }

    private initValue(): void {
        if (!this.inputElement.value) {
            this.value = this.getDefaultValue();
        } else {
            this.value = this.converter.toValid(this.inputElement.value);
        }
    }

    private getDefaultValue(): string {
        return (this.isAllowEmpty) ? '' : '0';
    }

    private updateInputBindings(): void {
        const rawValue = this.converter.toRaw(this.value);

        if (this.inputElement.value !== rawValue) {
            this.inputElement.value = rawValue;
        }

        if (this.inputElement.disabled !== this.isDisabled) {
            this.inputElement.disabled = this.isDisabled;
        }
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
