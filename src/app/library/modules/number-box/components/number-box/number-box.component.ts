import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Optional,
    Output,
    Self,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { OsBaseFieldComponent } from '../../../../core';
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
export class NumberBoxComponent extends OsBaseFieldComponent implements OnChanges, AfterViewInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** Fires when the number-box value change */
    @Output()
    public osChange: EventEmitter<NumberBoxChangeEvent> = new EventEmitter();

    @ViewChild('numberbox')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    constructor(
        @Self() @Optional() protected readonly controlDir: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initValueAccessor(this);
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.inputElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.inputElementRef.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

    /** @internal */
    public writeValue(value: string | number): void {
        if (typeof(value) === 'number' || typeof(value) === 'string') {
            this.value = this.processValue(value);
        } else {
            this.value = '';
        }

        this.changeDetector.detectChanges();
    }

    protected onInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        inputElement.value = this.processValue(inputElement.value);

        super.onInput(event);
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLInputElement;
        const value = +targetElement.value;

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
        this.changeDetector.markForCheck();
    }

    private processValueFromSimpleChanges(changes: SimpleChanges): void {
        if (changes.value?.previousValue !== changes.value?.currentValue) {
            this.value = this.processValue(changes.value.currentValue);
        }
    }

    private processValue(value: string | number): string {
        return value.toString()
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*?)\..*/g, '$1');
    }
}
