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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '../../../../core';
import { ITextBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-text-box',
    templateUrl: './text-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextBoxComponent),
            multi: true
        }
    ]
})
export class TextBoxComponent extends OsBaseFieldComponent implements OnInit, AfterViewInit {
    @Input()
    public isAutocompleteEnabled: boolean = false;

    @Output()
    public osChange: EventEmitter<ITextBoxChangeEvent> = new EventEmitter();

    @ViewChild('textbox')
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
        this.classListManager.add('os-text-box');
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
        const targetElement = originalEvent.target as HTMLInputElement;
        const textboxValue: string = targetElement.value;

        this.onChange?.(textboxValue);
        this.osChange.emit({ originalEvent, value: textboxValue });
        this.changeDetector.markForCheck();
    }
}
