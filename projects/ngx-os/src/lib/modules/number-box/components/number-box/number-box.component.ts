import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '@lib-core';
import { INumberBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-number-box',
    templateUrl: './number-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberBoxComponent),
            multi: true
        }
    ]
})
export class NumberBoxComponent extends OsBaseFieldComponent implements OnInit, OnChanges, AfterViewInit {
    @Input()
    public isAutocompleteEnabled: boolean = false;

    @Output()
    public osChange: EventEmitter<INumberBoxChangeEvent> = new EventEmitter();

    @ViewChild('numberbox')
    private readonly fieldElementRef: ElementRef<HTMLInputElement>;

    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-number-box');
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.fieldElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.fieldElementRef.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueFromSimpleChanges(changes);
    }

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
