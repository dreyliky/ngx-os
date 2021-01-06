import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from 'os-angular/core';
import { TextBoxChangeEvent } from '../../interfaces';
import { textboxType } from '../../shared';

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
export class TextBoxComponent extends OsBaseFieldComponent implements ControlValueAccessor {

    @Input()
    public type: textboxType = 'text';

    @Output()
    public osChange: EventEmitter<TextBoxChangeEvent> = new EventEmitter();

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onTextboxValueChange(event: Event): void {
        const targetElement = event.target as HTMLInputElement;
        const textboxValue: string = targetElement.value;

        this.onChange(textboxValue);
        this.osChange.emit({ event, value: textboxValue });
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
