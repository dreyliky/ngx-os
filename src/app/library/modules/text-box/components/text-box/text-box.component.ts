import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '../../../../core';
import { TextBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-text-box',
    templateUrl: './text-box.component.html',
    host: {
        'class': 'os-text-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextBoxComponent),
            multi: true
        }
    ]
})
export class TextBoxComponent extends OsBaseFieldComponent implements AfterViewInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** Fires when the text-box value change */
    @Output()
    public osChange: EventEmitter<TextBoxChangeEvent> = new EventEmitter();

    @ViewChild('textbox')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.inputElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.inputElementRef.nativeElement);
    }

    /** @internal */
    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLInputElement;
        const textboxValue: string = targetElement.value;

        super.onFieldValueChange(originalEvent);
        this.onChange?.(textboxValue);
        this.osChange.emit({ originalEvent, value: textboxValue });
        this.changeDetector.markForCheck();
    }
}
