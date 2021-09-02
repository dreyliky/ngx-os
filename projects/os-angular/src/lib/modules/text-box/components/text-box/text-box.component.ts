import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '@lib-core';
import { TextBoxChangeEvent } from '../../interfaces';
import { TextboxType } from '../../types';

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
export class TextBoxComponent extends OsBaseFieldComponent implements OnInit, ControlValueAccessor {
    @Input()
    public type: TextboxType = 'text';

    @Input()
    public isAutocompleteEnabled: boolean = false;

    @Output()
    public osChange: EventEmitter<TextBoxChangeEvent> = new EventEmitter();

    public get inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    public onChange: (value: string) => any;
    public onTouched: () => any;

    constructor(
        elementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super(elementRef);
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-text-box');
    }

    public onTextboxValueChange(event: Event): void {
        const targetElement = event.target as HTMLInputElement;
        const textboxValue: string = targetElement.value;

        this.onChange?.(textboxValue);
        this.osChange.emit({ event, value: textboxValue });
    }

    public registerOnChange(fn: () => any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }
}
