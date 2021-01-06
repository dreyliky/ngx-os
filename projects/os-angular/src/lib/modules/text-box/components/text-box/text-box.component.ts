import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from 'os-angular/core';
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
export class TextBoxComponent extends OsBaseFieldComponent {

    @Input()
    public type: textboxType = 'text';

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onTextboxValueChange(event: Event): void {
        const targetElement = event.target as HTMLInputElement;
        const textboxValue: string = targetElement.value;

        this.onChange(textboxValue);
        this.osChange.emit(event);
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
