import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '../../../../core';
import { TextareaBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-textarea-box',
    templateUrl: './textarea-box.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaBoxComponent),
            multi: true
        }
    ]
})
export class TextareaBoxComponent extends OsBaseFieldComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    /** Specifies the visible height of a textarea-box, in lines. */
    @Input()
    public rows: number;

    /** Specifies the visible width of a textarea-box, in lines. */
    @Input()
    public cols: number;

    /** Fires when the textarea-box value change */
    @Output()
    public osChange: EventEmitter<TextareaBoxChangeEvent> = new EventEmitter();

    @ViewChild('textarea')
    private readonly fieldElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-textarea-box');
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.fieldElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.fieldElementRef.nativeElement);
    }

    /** @internal */
    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLTextAreaElement;
        const value = targetElement.value;

        super.onFieldValueChange(originalEvent);
        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
        this.changeDetector.markForCheck();
    }
}
