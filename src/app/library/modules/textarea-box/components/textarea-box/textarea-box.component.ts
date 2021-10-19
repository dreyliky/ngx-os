import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { OsBaseFieldComponent } from '../../../../core';
import { TextareaBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-textarea-box',
    templateUrl: './textarea-box.component.html',
    host: {
        'class': 'os-textarea-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaBoxComponent
    extends OsBaseFieldComponent
    implements AfterViewInit, ControlValueAccessor {
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
    private readonly textareaElementRef: ElementRef<HTMLInputElement>;

    constructor(
        @Self() @Optional() protected readonly controlDir: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initValueAccessor(this);
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.textareaElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.textareaElementRef.nativeElement);
    }

    /** @internal */
    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLTextAreaElement;
        const value = targetElement.value;

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
        this.changeDetector.markForCheck();
    }
}
