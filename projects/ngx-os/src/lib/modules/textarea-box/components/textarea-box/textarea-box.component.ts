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
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '@lib-core';
import { ITextareaBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-textarea-box',
    templateUrl: './textarea-box.component.html',
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
    @Input()
    public rows: number;

    @Input()
    public cols: number;

    @Output()
    public osChange: EventEmitter<ITextareaBoxChangeEvent> = new EventEmitter();

    @ViewChild('textarea')
    private readonly fieldElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-textarea-box');
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.fieldElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.fieldElementRef.nativeElement);
    }

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
