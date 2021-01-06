import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component,
    EventEmitter, forwardRef, Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from 'os-angular/core';
import { TextareaBoxChangeEvent } from '../../interfaces';

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
export class TextareaBoxComponent extends OsBaseFieldComponent implements ControlValueAccessor {

    @Input()
    public rows: number;

    @Input()
    public cols: number;

    @Output()
    public osChange: EventEmitter<TextareaBoxChangeEvent> = new EventEmitter();

    constructor(
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onTextareaBoxValueChange(event: Event): void {
        const targetElement = event.target as HTMLTextAreaElement;
        const textareaBoxValue: string = targetElement.value;

        this.onChange(textareaBoxValue);
        this.osChange.emit({ event, value: textareaBoxValue });
    }

    public registerOnChange(fn: () => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    public onChange: any = (): any => {};

    public onTouched: any = (): any => {};

}
